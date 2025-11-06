<script src="http://localhost:8097"></script>
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConvexProvider } from '../lib/convex';  // Uncomment and fix: Use your lib wrapper
import { useTheme } from '../hooks/useTheme';  // Fixed path: Use @/ for root aliases
import { theme } from '../app/constants/theme';  // Fixed path: Remove '../app/'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConvexReactClient } from 'convex/react';

console.log('Layout rendered');  // Global log (runs on module load)

function RootLayoutNav() {
  const { theme: themeMode } = useTheme();
  const themeConfig = {
    ...theme,
    mode: themeMode,
    colors: theme.colors[themeMode],
  };

  console.log('RootLayoutNav rendering with theme:', themeMode);

  return (
    <ThemeProvider theme={themeConfig}>
      <Slot />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  console.log('RootLayout loaded');

  return (
    <SafeAreaProvider>
      <ConvexProvider>  {/* Uncomment and wrap for Convex */}
        <GestureHandlerRootView style={{ flex: 1 }}>  {/* Wraps entire app for gestures */}
          <RootLayoutNav />
        </GestureHandlerRootView>
      </ConvexProvider>
    </SafeAreaProvider>
  );
}