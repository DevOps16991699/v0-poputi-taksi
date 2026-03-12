import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Geolocation, type Position } from '@capacitor/geolocation';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

// Check if running on native platform
export const isNative = Capacitor.isNativePlatform();
export const isAndroid = Capacitor.getPlatform() === 'android';
export const isIOS = Capacitor.getPlatform() === 'ios';
export const isWeb = Capacitor.getPlatform() === 'web';

// Haptic feedback
export const hapticFeedback = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
  if (!isNative) return;
  
  const impactStyle = {
    light: ImpactStyle.Light,
    medium: ImpactStyle.Medium,
    heavy: ImpactStyle.Heavy,
  };
  
  await Haptics.impact({ style: impactStyle[style] });
};

export const hapticNotification = async (type: 'success' | 'warning' | 'error' = 'success') => {
  if (!isNative) return;
  
  const notificationType = {
    success: 'SUCCESS' as const,
    warning: 'WARNING' as const,
    error: 'ERROR' as const,
  };
  
  await Haptics.notification({ type: notificationType[type] });
};

// Status bar
export const setStatusBarStyle = async (style: 'light' | 'dark') => {
  if (!isNative) return;
  
  await StatusBar.setStyle({ 
    style: style === 'light' ? Style.Light : Style.Dark 
  });
};

export const setStatusBarColor = async (color: string) => {
  if (!isNative || !isAndroid) return;
  
  await StatusBar.setBackgroundColor({ color });
};

export const hideStatusBar = async () => {
  if (!isNative) return;
  await StatusBar.hide();
};

export const showStatusBar = async () => {
  if (!isNative) return;
  await StatusBar.show();
};

// Keyboard
export const hideKeyboard = async () => {
  if (!isNative) return;
  await Keyboard.hide();
};

export const addKeyboardListeners = (
  onShow?: (info: { keyboardHeight: number }) => void,
  onHide?: () => void
) => {
  if (!isNative) return;
  
  if (onShow) {
    Keyboard.addListener('keyboardWillShow', onShow);
  }
  if (onHide) {
    Keyboard.addListener('keyboardWillHide', onHide);
  }
};

export const removeKeyboardListeners = () => {
  if (!isNative) return;
  Keyboard.removeAllListeners();
};

// Geolocation
export const getCurrentPosition = async (): Promise<Position | null> => {
  try {
    const permission = await Geolocation.checkPermissions();
    
    if (permission.location !== 'granted') {
      const request = await Geolocation.requestPermissions();
      if (request.location !== 'granted') {
        return null;
      }
    }
    
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });
    
    return position;
  } catch {
    console.error('Error getting location');
    return null;
  }
};

export const watchPosition = (
  callback: (position: Position) => void,
  errorCallback?: (error: unknown) => void
) => {
  return Geolocation.watchPosition(
    { enableHighAccuracy: true },
    (position, error) => {
      if (error) {
        errorCallback?.(error);
        return;
      }
      if (position) {
        callback(position);
      }
    }
  );
};

// Splash screen
export const hideSplashScreen = async () => {
  if (!isNative) return;
  await SplashScreen.hide();
};

export const showSplashScreen = async () => {
  if (!isNative) return;
  await SplashScreen.show();
};

// App lifecycle
export const addAppStateListener = (
  callback: (state: { isActive: boolean }) => void
) => {
  if (!isNative) return;
  
  App.addListener('appStateChange', callback);
};

export const addBackButtonListener = (callback: () => void) => {
  if (!isNative || !isAndroid) return;
  
  App.addListener('backButton', callback);
};

export const exitApp = () => {
  if (!isNative) return;
  App.exitApp();
};

// URL handling
export const addUrlListener = (callback: (url: { url: string }) => void) => {
  if (!isNative) return;
  App.addListener('appUrlOpen', callback);
};

// Initialize native features
export const initializeNativeFeatures = async () => {
  if (!isNative) return;
  
  try {
    // Hide splash screen after app is ready
    await SplashScreen.hide({ fadeOutDuration: 300 });
    
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Light });
    
    if (isAndroid) {
      await StatusBar.setBackgroundColor({ color: '#10b981' });
    }
  } catch (error) {
    console.error('Error initializing native features:', error);
  }
};
