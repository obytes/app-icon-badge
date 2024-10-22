import { ConfigContext, ExpoConfig } from 'expo/config';
import type { AppIconBadgeOptions } from 'app-icon-badge/types';

const appIconBadgeConfig: AppIconBadgeOptions = {
  enabled: true, // enable/ disable the plugin based on the environment (usually disabled for production builds)
  badges: [
    {
      text: 'DEV', // banner text
      type: 'banner', // banner or ribbon
      color: 'white', // by default it will be white and the only color supported for now is white and black
      background: '#FF0000', // by default it will be black and we are only supporting hex format for colors
    },
    {
      text: 'V1.0.1',
      type: 'ribbon',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'demo',
  slug: 'demo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.obytes.demo',
    icon: './assets/images/icon.png',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.obytes.demo',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: ['expo-router', ['app-icon-badge', appIconBadgeConfig]],
  experiments: {
    typedRoutes: true,
  },
});
