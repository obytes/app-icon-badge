import { addBadge } from '../index';
import type { AppIconBadgeConfig } from '../../types';
import type { ConfigPlugin } from '@expo/config-plugins';

const DST_APP_ICON_BADGE_FOLDER = '.expo/app-icon-badge';
const DST_ICON = `${DST_APP_ICON_BADGE_FOLDER}/icon.png`;
const DST_ADAPTIVE_APP_ICON = `${DST_APP_ICON_BADGE_FOLDER}/foregroundImage.png`;

/**
 * In case the user has provided an icon, in the global config, we need to generate the icon with the badge and update the config
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */

const withIcon: ConfigPlugin<AppIconBadgeConfig> = (config, options) => {
  const iconPath = config?.icon;
  if (iconPath) {
    addBadge({
      icon: iconPath,
      dstPath: DST_ICON,
      badges: options.badges,
    }).catch(() => {});
    config.icon = DST_ICON;
  }
  return config;
};

/**
 * For iOS and icon inside ios config
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */
const withIconBadgeAndroid: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const adaptiveIconPath = config?.android?.adaptiveIcon?.foregroundImage;
  if (adaptiveIconPath) {
    addBadge({
      icon: adaptiveIconPath,
      dstPath: DST_ADAPTIVE_APP_ICON,
      badges: options.badges,
    }).catch(() => {});
    config.android!.adaptiveIcon!.foregroundImage = DST_ADAPTIVE_APP_ICON;
  }

  return config;
};

/**
 * For iOS and icon inside ios config
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */

const withIconBadgeIOS: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const iconPath = config?.ios?.icon;

  if (iconPath) {
    addBadge({
      icon: iconPath,
      dstPath: DST_ICON,
      badges: options.badges,
    }).catch(() => {});

    config!.ios!.icon = DST_ICON;
  }
  return config;
};

/**
 * The main plugin that adds the badge to the icon and updates the config
 * checks if the plugin is enabled and then calls the other plugins for iOS and Android
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */

export const withIconBadge: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const { badges = [], enabled = true } = options;
  if (!enabled) return config;
  config = withIcon(config, options);
  config = withIconBadgeAndroid(config, { badges });
  config = withIconBadgeIOS(config, { badges });

  return config;
};
