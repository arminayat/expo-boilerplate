const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

// Exercise the real adapter without loading native modules or contacting RevenueCat.
const source = ts.transpileModule(
  readFileSync(require.resolve("../src/lib/revenuecat.ts"), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  },
).outputText;

function setup(options = {}) {
  const { platform = "ios", overrides = {} } = options;
  const apiKey = Object.hasOwn(options, "apiKey")
    ? options.apiKey
    : "appl_test";
  const calls = [];
  const effects = [];
  const updates = [];
  const warnings = [];
  const sdk = {
    isConfigured: async () => false,
    configure: () => {},
    enableAdServicesAttributionTokenCollection: async () => {},
    logIn: async (userId) => ({ userId }),
    logOut: async () => ({}),
    getOfferings: async () => ({ all: {} }),
    ...overrides,
  };
  const purchases = Object.fromEntries(
    Object.entries(sdk).map(([name, implementation]) => [
      name,
      (...args) => {
        calls.push({ name, args });
        return implementation(...args);
      },
    ]),
  );
  const exports = {};
  runInNewContext(source, {
    exports,
    process: { env: { EXPO_PUBLIC_APPLE_PURCHASES_API_KEY: apiKey } },
    console: { warn: (...args) => warnings.push(args) },
    require(name) {
      if (name === "react-native-purchases") return purchases;
      if (name === "react-native") return { Platform: { OS: platform } };
      if (name === "react")
        return {
          useState: () => [null, (value) => updates.push(value)],
          useEffect: (effect, dependencies) =>
            effects.push({ effect, dependencies }),
        };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return { adapter: exports, calls, effects, updates, warnings };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
const names = (calls) => calls.map(({ name }) => name);

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

test("unconfigured and unsupported platforms never call the native SDK", async () => {
  for (const options of [
    { apiKey: undefined },
    { apiKey: "  " },
    { apiKey: "" },
    { platform: "android" },
    { platform: "web" },
  ]) {
    const { adapter, calls, effects, updates } = setup(options);
    assert.equal(await adapter.configureRevenueCat({}), false);
    await adapter.loginWithRevenueCat({ userId: "user-a" });
    await adapter.logoutFromRevenueCat();
    adapter.useGetOffering();
    effects[0].effect();
    await settle();
    assert.deepEqual(calls, []);
    assert.deepEqual(updates, []);
  }
});

test("concurrent configuration shares initialization and login waits for it", async () => {
  const ready = deferred();
  const { adapter, calls } = setup({
    overrides: {
      isConfigured: () => ready.promise,
    },
  });
  const first = adapter.configureRevenueCat({ userId: "user-a" });
  const second = adapter.configureRevenueCat({ userId: "user-a" });
  const login = adapter.loginWithRevenueCat({ userId: "user-b" });
  assert.equal(first, second);
  assert.deepEqual(names(calls), ["isConfigured"]);
  ready.resolve(false);
  assert.deepEqual(await login, { userId: "user-b" });
  assert.deepEqual(names(calls), [
    "isConfigured",
    "configure",
    "enableAdServicesAttributionTokenCollection",
    "logIn",
  ]);
  assert.equal(calls[1].args[0].appUserID, "user-a");
});

test("already configured SDK is reused", async () => {
  const { adapter, calls } = setup({
    overrides: { isConfigured: async () => true },
  });
  await adapter.loginWithRevenueCat({ userId: "user-a" });
  assert.deepEqual(names(calls), ["isConfigured", "logIn"]);
});

test("failed initialization rejects and a later attempt can retry", async () => {
  let attempts = 0;
  const failure = new Error("Native initialization failed");
  const { adapter, calls } = setup({
    overrides: {
      configure() {
        if (++attempts === 1) throw failure;
      },
    },
  });
  await assert.rejects(
    adapter.loginWithRevenueCat({ userId: "user-a" }),
    failure,
  );
  await adapter.loginWithRevenueCat({ userId: "user-a" });
  assert.equal(attempts, 2);
  assert.equal(calls.filter(({ name }) => name === "logIn").length, 1);
});

test("native login rejection is returned to the caller", async () => {
  const failure = new Error("Login failed");
  const { adapter } = setup({
    overrides: {
      logIn: async () => {
        throw failure;
      },
    },
  });
  await assert.rejects(
    adapter.loginWithRevenueCat({ userId: "user-a" }),
    failure,
  );
});

test("offering fetch runs in an effect and updates only after completion", async () => {
  const result = { all: { current: { identifier: "example" } } };
  const { adapter, calls, effects, updates } = setup({
    overrides: { getOfferings: async () => result },
  });
  assert.equal(adapter.useGetOffering(), undefined);
  assert.deepEqual(calls, []);
  assert.equal(effects[0].dependencies.length, 0);
  effects[0].effect();
  await settle();
  assert.deepEqual(updates, [result]);
  assert.equal(calls.filter(({ name }) => name === "getOfferings").length, 1);
});

test("unmount prevents updates from an in-flight offering request", async () => {
  const result = deferred();
  const { adapter, effects, updates } = setup({
    overrides: { getOfferings: () => result.promise },
  });
  adapter.useGetOffering();
  const cleanup = effects[0].effect();
  await settle();
  cleanup();
  result.resolve({ all: {} });
  await settle();
  assert.deepEqual(updates, []);
});

test("offering failures are handled without a state update", async () => {
  const failure = new Error("Offerings unavailable");
  const { adapter, effects, updates, warnings } = setup({
    overrides: {
      getOfferings: async () => {
        throw failure;
      },
    },
  });
  adapter.useGetOffering();
  effects[0].effect();
  await settle();
  assert.deepEqual(updates, []);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0][1], failure);
});
