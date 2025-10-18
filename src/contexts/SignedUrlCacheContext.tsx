import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { TBucket } from "@/types";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";

type CachedUrl = {
  url: string;
  expiresAt: number;
};

type SignedUrlCacheContextType = {
  getCachedSignedUrl: (
    bucket: TBucket,
    path: string,
    isUserImage?: boolean,
    expiresInSeconds?: number,
  ) => Promise<string>;
  clearCache: () => void;
  getCacheStats: () => { size: number; keys: string[] };
};

const SignedUrlCacheContext = createContext<
  SignedUrlCacheContextType | undefined
>(undefined);

export const SignedUrlCacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { session } = useAuth();
  const cacheRef = useRef<Map<string, CachedUrl>>(new Map());
  const currentUserRef = useRef<string | undefined>(session?.user?.id);

  // Clear cache when user changes
  React.useEffect(() => {
    if (currentUserRef.current !== session?.user?.id) {
      cacheRef.current.clear();
      currentUserRef.current = session?.user?.id;
    }
  }, [session?.user?.id]);

  const generateCacheKey = useCallback(
    (
      bucket: string,
      path: string,
      isUserImage: boolean,
      userId?: string,
    ): string => {
      const fullPath = isUserImage && userId ? `${userId}/${path}` : path;
      return `${bucket}:${fullPath}`;
    },
    [],
  );

  const clearExpiredUrls = useCallback(() => {
    const now = Date.now();
    for (const [key, cached] of cacheRef.current.entries()) {
      if (cached.expiresAt <= now) {
        cacheRef.current.delete(key);
      }
    }
  }, []);

  const getCachedSignedUrl = useCallback(
    async (
      bucket: TBucket,
      path: string,
      isUserImage: boolean = false,
      expiresInSeconds: number = 3600,
    ): Promise<string> => {
      const userId = session?.user?.id;
      const cacheKey = generateCacheKey(bucket, path, isUserImage, userId);
      const now = Date.now();

      // Clean expired URLs occasionally
      if (Math.random() < 0.1) {
        // 10% chance
        clearExpiredUrls();
      }

      // Check if we have a valid cached URL (with 5-minute buffer)
      const cached = cacheRef.current.get(cacheKey);
      if (cached && cached.expiresAt > now + 300000) {
        return cached.url;
      }

      // Create new signed URL
      const fullPath = isUserImage && userId ? `${userId}/${path}` : path;
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(fullPath, expiresInSeconds);

      if (error || !data?.signedUrl) {
        throw new Error(
          `Failed to create signed URL: ${error?.message || "Unknown error"}`,
        );
      }

      // Cache the URL with expiration time
      const expiresAt = now + expiresInSeconds * 1000;
      cacheRef.current.set(cacheKey, {
        url: data.signedUrl,
        expiresAt,
      });

      return data.signedUrl;
    },
    [session?.user?.id, generateCacheKey, clearExpiredUrls],
  );

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  const getCacheStats = useCallback(() => {
    return {
      size: cacheRef.current.size,
      keys: Array.from(cacheRef.current.keys()),
    };
  }, []);

  return (
    <SignedUrlCacheContext.Provider
      value={{
        getCachedSignedUrl,
        clearCache,
        getCacheStats,
      }}
    >
      {children}
    </SignedUrlCacheContext.Provider>
  );
};

export const useSignedUrlCache = () => {
  const context = useContext(SignedUrlCacheContext);
  if (context === undefined) {
    throw new Error(
      "useSignedUrlCache must be used within a SignedUrlCacheProvider",
    );
  }
  return context;
};
