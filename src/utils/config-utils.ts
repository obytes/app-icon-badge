import type { ThemeIconConfig } from '../types/icon-config';

/**
 * Safely updates iOS icon configuration in Expo config
 * @param config - Expo config object
 * @param iconConfig - New icon configuration (string or theme object)
 */
export const updateIOSIconConfig = (config: any, iconConfig: string | ThemeIconConfig): void => {
  if (!config.ios) {
    config.ios = {};
  }
  config.ios.icon = iconConfig;
};