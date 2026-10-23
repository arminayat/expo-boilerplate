import useGetEntrancePath from "@/hooks/useGetEntrancePath";
import { loginWithRevenueCat } from "@/lib/revenuecat";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { supabase } from "../lib/supabase/client";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const posthog = usePostHog();
  const entrancePath = useGetEntrancePath();
  const previousSessionRef = useRef<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      previousSessionRef.current = session;
      setIsLoading(false);
      return session;
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const previousSession = previousSessionRef.current;
      setSession(newSession);
      previousSessionRef.current = newSession;
      setIsLoading(false);

      // redirect when signed in
      if (newSession !== null && previousSession === null) {
        router.replace(`/(tabs)/${entrancePath}`);
      }
      // redirect when signed out
      if (newSession === null && previousSession !== null) {
        console.log("redirecting to sign-in");
        router.replace("/(auth)/sign-in");
      }

      if (newSession?.user?.id) {
        void loginWithRevenueCat({
          userId: newSession.user.id,
        }).catch((error) => {
          console.warn("Unable to identify RevenueCat user", error);
        });
        posthog.identify(newSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [posthog, entrancePath]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
