import type { Router as ExpoRouter } from "expo-router";

type RouterNavigationOptions = Parameters<ExpoRouter["push"]>[1];
type RouterHref = string | Parameters<ExpoRouter["push"]>[0];

type RelaxedRouter = Omit<
  ExpoRouter,
  "dismissTo" | "navigate" | "prefetch" | "push" | "replace"
> & {
  dismissTo: (href: RouterHref, options?: RouterNavigationOptions) => void;
  navigate: (href: RouterHref, options?: RouterNavigationOptions) => void;
  prefetch: (href: RouterHref) => void;
  push: (href: RouterHref, options?: RouterNavigationOptions) => void;
  replace: (href: RouterHref, options?: RouterNavigationOptions) => void;
};

declare module "expo-router" {
  export function useRouter(): RelaxedRouter;
}
