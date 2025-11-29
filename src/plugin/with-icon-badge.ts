import type { AppIconBadgeConfig } from '../../types';
import type { ConfigPlugin } from '@expo/config-plugins';
import type { IconConfig, ThemeIconConfig } from '../types/icon-config';
import { isThemeIconConfig } from '../types/icon-config';
import { validateIconPath, getIconPath, getValidIconVariants } from '../utils/icon-validation';
import { generateBadgedIcon } from '../utils/file-operations';
import { updateIOSIconConfig } from '../utils/config-utils';

const DST_APP_ICON_BADGE_FOLDER = '.expo/app-icon-badge';
const DST_ICON = `${DST_APP_ICON_BADGE_FOLDER}/icon.png`;
const DST_ANDROID_ICON = `${DST_APP_ICON_BADGE_FOLDER}/android-icon.png`;
const DST_ADAPTIVE_APP_ICON = `${DST_APP_ICON_BADGE_FOLDER}/foregroundImage.png`;
const DST_IOS_ICON_LIGHT = `${DST_APP_ICON_BADGE_FOLDER}/ios-icon-light.png`;
const DST_IOS_ICON_DARK = `${DST_APP_ICON_BADGE_FOLDER}/ios-icon-dark.png`;
const DST_IOS_ICON_TINTED = `${DST_APP_ICON_BADGE_FOLDER}/ios-icon-tinted.png`;


/**
 * Processes global icon configuration and updates paths to badged versions
 * 
 * Handles both string and theme-based icon configurations at the global level.
 * When a global icon is configured, it updates the path to point to the generated badged version.
 * 
 * @param config - Expo configuration object
 * @param options - Plugin options (currently unused but kept for API consistency)
 * @returns Updated configuration with global icon path pointing to badged version
 * 
 * @example
 * ```typescript
 * // String configuration
 * const config = { icon: "./assets/icon.png" };
 * const result = withIcon(config, options);
 * // result.icon === ".expo/app-icon-badge/icon.png"
 * 
 * // Theme configuration (uses fallback logic)
 * const config = { icon: { light: "./light.png", dark: "./dark.png" } };
 * const result = withIcon(config, options);
 * // result.icon === ".expo/app-icon-badge/icon.png"
 * ```
 */
const withIcon: ConfigPlugin<AppIconBadgeConfig> = (config, options) => {
  const iconPath = getIconPath(config?.icon as IconConfig);
  if (iconPath) {
    config.icon = DST_ICON;
  }
  return config;
};

/**
 * Processes Android icon configurations (both standard and adaptive icons)
 * 
 * Handles both Android standard icons and adaptive icon foreground images by updating 
 * the paths to point to the generated badged versions. Validates that the Android 
 * configuration exists before making updates to prevent runtime errors.
 * 
 * @param config - Expo configuration object
 * @param options - Plugin options (currently unused but kept for API consistency)
 * @returns Updated configuration with Android icons pointing to badged versions
 * 
 * @example
 * ```typescript
 * // Standard Android icon
 * const config = {
 *   android: {
 *     icon: "./assets/android-icon.png"
 *   }
 * };
 * const result = withIconBadgeAndroid(config, options);
 * // result.android.icon === ".expo/app-icon-badge/android-icon.png"
 * 
 * // Adaptive icon
 * const config = {
 *   android: {
 *     adaptiveIcon: {
 *       foregroundImage: "./assets/adaptive-icon.png",
 *       backgroundColor: "#ffffff"
 *     }
 *   }
 * };
 * const result = withIconBadgeAndroid(config, options);
 * // result.android.adaptiveIcon.foregroundImage === ".expo/app-icon-badge/foregroundImage.png"
 * ```
 */
const withIconBadgeAndroid: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  // Handle standard Android icon
  const androidIconPath = getIconPath(config?.android?.icon as IconConfig);
  if (androidIconPath && config.android) {
    config.android.icon = DST_ANDROID_ICON;
  }

  // Handle Android adaptive icon foreground
  const adaptiveIconPath = getIconPath(config?.android?.adaptiveIcon?.foregroundImage as IconConfig);
  if (adaptiveIconPath && config.android?.adaptiveIcon) {
    config.android.adaptiveIcon.foregroundImage = DST_ADAPTIVE_APP_ICON;
  }

  return config;
};

/**
 * For iOS and icon inside ios config
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */


/**
 * Processes iOS icon configuration supporting both string and theme-based formats
 * 
 * This function handles the core feature of supporting iOS theme-based icons (light, dark, tinted).
 * When theme-based configuration is detected, it processes all provided variants and maintains
 * the object structure. For string-based configuration, it updates to the single badged icon path.
 * 
 * @param config - Expo configuration object
 * @param options - Plugin options (currently unused but kept for API consistency) 
 * @returns Updated configuration with iOS icon paths pointing to badged versions
 * 
 * @example
 * ```typescript
 * // String configuration
 * const config = { ios: { icon: "./assets/icon.png" } };
 * const result = withIconBadgeIOS(config, options);
 * // result.ios.icon === ".expo/app-icon-badge/icon.png"
 * 
 * // Theme-based configuration
 * const config = {
 *   ios: {
 *     icon: {
 *       light: "./assets/icon-light.png",
 *       dark: "./assets/icon-dark.png",
 *       tinted: "./assets/icon-tinted.png"
 *     }
 *   }
 * };
 * const result = withIconBadgeIOS(config, options);
 * // result.ios.icon === {
 * //   light: ".expo/app-icon-badge/ios-icon-light.png",
 * //   dark: ".expo/app-icon-badge/ios-icon-dark.png",
 * //   tinted: ".expo/app-icon-badge/ios-icon-tinted.png"
 * // }
 * ```
 */
const withIconBadgeIOS: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const iosIconConfig = config?.ios?.icon as IconConfig | undefined;
  
  if (!iosIconConfig) {
    return config;
  }

  if (isThemeIconConfig(iosIconConfig)) {
    // Handle theme-based icon configuration
    const newIconConfig: ThemeIconConfig = {};
    
    if (iosIconConfig.light) {
      newIconConfig.light = DST_IOS_ICON_LIGHT;
    }
    if (iosIconConfig.dark) {
      newIconConfig.dark = DST_IOS_ICON_DARK;
    }
    if (iosIconConfig.tinted) {
      newIconConfig.tinted = DST_IOS_ICON_TINTED;
    }
    
    updateIOSIconConfig(config, newIconConfig);
  } else {
    // Handle string-based icon configuration
    updateIOSIconConfig(config, DST_ICON);
  }
  
  return config;
};

/**
 * Main Expo config plugin that generates badged app icons for iOS and Android
 * 
 * This plugin processes app icons and adds badges (banners/ribbons) to them before
 * Expo's native build process. It supports:
 * 
 * - **iOS theme-based icons**: Processes light, dark, and tinted variants individually
 * - **String-based icons**: Traditional single icon path configuration
 * - **Android adaptive icons**: Processes foreground images for adaptive icons
 * - **Global icons**: Top-level icon configuration
 * 
 * The plugin generates badged icons synchronously during the prebuild phase and updates
 * the configuration to point to the generated badged versions.
 * 
 * @param config - Expo configuration object containing icon paths
 * @param options - Plugin configuration options
 * @param options.badges - Array of badge configurations (banners/ribbons)
 * @param options.enabled - Whether the plugin is enabled (default: true)
 * @returns Updated configuration with paths pointing to badged icon files
 * 
 * @example
 * ```typescript
 * // Basic usage in app.config.js
 * export default {
 *   // ... other config
 *   plugins: [
 *     ['app-icon-badge', {
 *       enabled: true,
 *       badges: [
 *         {
 *           text: 'DEV',
 *           type: 'banner',
 *           color: 'white',
 *           background: '#FF0000'
 *         }
 *       ]
 *     }]
 *   ]
 * };
 * 
 * // iOS theme-based configuration
 * export default {
 *   ios: {
 *     icon: {
 *       light: './assets/icon-light.png',
 *       dark: './assets/icon-dark.png',
 *       tinted: './assets/icon-tinted.png'
 *     }
 *   },
 *   plugins: [['app-icon-badge', { badges: [...] }]]
 * };
 * ```
 * 
 * @throws {Error} When icon files are not found or badge generation fails
 * @see {@link https://github.com/obytes/app-icon-badge} for more examples and configuration options
 */
export const withIconBadge: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const { badges = [], enabled = true } = options;
  if (!enabled) return config;
  
  // Validate and store original icon paths before modifying config
  const originalIconPath = getIconPath(config?.icon as IconConfig);
  const originalAndroidIconPath = getIconPath(config?.android?.icon as IconConfig);
  const originalAdaptiveIconPath = getIconPath(config?.android?.adaptiveIcon?.foregroundImage as IconConfig);
  const originalIOSIconPath = getIconPath(config?.ios?.icon as IconConfig);
  const originalIOSIconConfig = config?.ios?.icon as IconConfig | undefined;

  // Generate badge files synchronously BEFORE Expo's icon processing
  try {
    if (!options.badges || options.badges.length === 0) {
      console.warn('No badges configured, skipping badge generation');
      return config;
    }

    // Handle global icon
    if (originalIconPath) {
      generateBadgedIcon(originalIconPath, DST_ICON, options.badges);
    }
    
    // Handle iOS icons (theme variants or single icon)
    if (originalIOSIconConfig) {
      if (isThemeIconConfig(originalIOSIconConfig)) {
        // Process all theme variants
        const variants = getValidIconVariants(originalIOSIconConfig);
        
        if (variants.light) {
          generateBadgedIcon(variants.light, DST_IOS_ICON_LIGHT, options.badges);
        }
        if (variants.dark) {
          generateBadgedIcon(variants.dark, DST_IOS_ICON_DARK, options.badges);
        }
        if (variants.tinted) {
          generateBadgedIcon(variants.tinted, DST_IOS_ICON_TINTED, options.badges);
        }
      } else if (typeof originalIOSIconConfig === 'string' && !originalIconPath) {
        // Single iOS icon (only if no global icon was processed)
        generateBadgedIcon(originalIOSIconConfig, DST_ICON, options.badges);
      }
    }
    
    // Handle Android standard icon
    if (originalAndroidIconPath) {
      generateBadgedIcon(originalAndroidIconPath, DST_ANDROID_ICON, options.badges);
    }

    // Handle Android adaptive icon
    if (originalAdaptiveIconPath) {
      generateBadgedIcon(originalAdaptiveIconPath, DST_ADAPTIVE_APP_ICON, options.badges, true);
    }
  } catch (error) {
    console.error('Badge generation failed:', error);
    console.warn('Falling back to original icons without badges');
    return config; // Return original config on failure
  }

  // Update config paths to point to badged files
  config = withIcon(config, options);
  config = withIconBadgeAndroid(config, { badges });
  config = withIconBadgeIOS(config, { badges });

  return config;
};
