import React from 'react';
import { ConvexReactClient, ConvexProviderWithAuth } from 'convex/react';
import { ConvexHttpClient } from 'convex/browser';

const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL || 'https://your-project.convex.cloud';

export const convex = new ConvexReactClient(CONVEX_URL);
export const httpClient = new ConvexHttpClient(CONVEX_URL);

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  // provide a minimal useAuth hook that satisfies ConvexProviderWithAuth's required shape
  const useAuth = () => ({
    isLoading: false,
    isAuthenticated: false,
    fetchAccessToken: async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => '',
  });

  return React.createElement(ConvexProviderWithAuth, { client: convex, useAuth }, children);
}