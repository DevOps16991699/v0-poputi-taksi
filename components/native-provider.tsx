'use client';

import { useEffect } from 'react';
import { initializeNativeFeatures, addBackButtonListener, exitApp, isNative } from '@/lib/capacitor';

export function NativeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize native features when app loads
    initializeNativeFeatures();

    // Handle Android back button
    addBackButtonListener(() => {
      // Check if we can go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Exit app if no history
        exitApp();
      }
    });
  }, []);

  return <>{children}</>;
}

// Hook to check if running on native platform
export function useIsNative() {
  return isNative;
}
