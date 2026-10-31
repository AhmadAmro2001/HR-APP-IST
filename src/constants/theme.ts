/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

import { tenantBrand } from '@/config/tenant';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

// Shared login and form tokens keep visual decisions out of screen files.
// Client colors come from tenantBrand so future copies change in one place.
export const AppTheme = {
  colors: {
    primary: tenantBrand.colors.primary,
    surface: '#FFFFFF',
    pageSurround: '#F5F5F5',
    text: '#302D2D',
    textSecondary: '#686868',
    muted: '#9C9C9C',
    placeholder: '#A6A6A6',
    cardBorder: '#DEDEDE',
    inputBorder: '#C7E4E6',
    errorText: '#A61B1B',
    errorBorder: '#F0B9B9',
    errorBackground: '#FFF2F2',
    menuOverlay: 'rgba(0, 0, 0, 0.35)',
    selectedMenuItem: '#E9F7F7',
  },
  radii: {
    loginCard: 32,
    input: 4,
    button: 4,
    homeTile: 12,
  },
  layout: {
    maxPhoneWidth: 430,
    loginHeaderHeight: 230,
    appHeaderHeight: 49,
    bottomNavHeight: 46,
    drawerWidth: 260,
  },
} as const;
