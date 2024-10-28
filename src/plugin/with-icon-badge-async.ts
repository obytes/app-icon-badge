import { addBadge } from '../index';
import type { AppIconBadgeConfig, Badge } from '../../types';
import type {
  ConfigPlugin,
  ExportedConfigWithProps,
} from '@expo/config-plugins';
import { withDangerousMod } from '@expo/config-plugins';

const DST_APP_ICON_BADGE_FOLDER = '.expo/app-icon-badge';
const DST_ICON = `${DST_APP_ICON_BADGE_FOLDER}/icon.png`;
const DST_ADAPTIVE_APP_ICON = `${DST_APP_ICON_BADGE_FOLDER}/foregroundImage.png`;

interface BadgeResult {
  error?: string;
  status: 'success' | 'error';
}

/**
 * A wrapper around addBadge that handles errors
 * @param params - Parameters for the addBadge function
 * @returns A promise that resolves to a BadgeResult object with status and error in case of error
 */

const addBadgeWithErrorsHandling = async (
  params: Parameters<typeof addBadge>[0]
): Promise<BadgeResult> => {
  try {
    await addBadge(params);
    return { status: 'success' };
  } catch (error) {
    return { error: 'An unknown error occurred', status: 'error' };
  }
};

/**
 * In case the user has provided an icon, in the global config, we need to generate the icon with the badge and update the config
 * @param config - Expo config
 * @param badges - Array of badges to add
 * @returns The updated config
 */

async function withIconAsync(
  config: ExportedConfigWithProps<unknown>,
  badges: Array<Badge>
) {
  const iconPath = config?.icon;
  if (iconPath) {
    const result = await addBadgeWithErrorsHandling({
      icon: iconPath,
      dstPath: DST_ICON,
      badges,
    });
    if (result.status === 'success') {
      config.icon = DST_ICON;
    }
  }
  return config;
}

/**
 * For iOS and icon inside ios config
 * @param config - Expo config
 * @param badges - Array of badges to add
 * @returns The updated config
 */

const withIconBadgeiOSAsync: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const { badges = [] } = options;
      config = await withIconAsync(config, badges);
      const iconPath = config?.ios?.icon;

      if (iconPath) {
        const result = await addBadgeWithErrorsHandling({
          icon: iconPath,
          dstPath: DST_ICON,
          badges,
        });

        if (result.status === 'success') {
          config!.ios!.icon = DST_ICON;
        }
      }

      return config;
    },
  ]);
};

/**
 * For Android and icon inside android config
 * @param config - Expo config
 * @param badges - Array of badges to add
 * @returns The updated config
 */

const withIconBadgeAndroidAsync: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const { badges = [] } = options;
      // Update the main icon
      config = await withIconAsync(config, badges);

      const adaptiveIconPath = config?.android?.adaptiveIcon?.foregroundImage;

      // Generate icon with badge
      if (adaptiveIconPath) {
        const result = await addBadgeWithErrorsHandling({
          icon: adaptiveIconPath,
          dstPath: DST_ADAPTIVE_APP_ICON,
          badges,
        });
        if (result.status === 'success') {
          config.android!.adaptiveIcon!.foregroundImage = DST_ADAPTIVE_APP_ICON;
        }
      }

      return config;
    },
  ]);
};

/**
 * The main plugin that adds the badge to the icon and updates the config
 * checks if the plugin is enabled and then calls the other plugins for iOS and Android
 * @param config - Expo config
 * @param options - Options for the plugin
 * @returns The updated config
 */

export const withIconBadgeAsync: ConfigPlugin<AppIconBadgeConfig> = (
  config,
  options
) => {
  const { badges = [], enabled = true } = options;
  if (!enabled) return config;
  config = withIconBadgeAndroidAsync(config, { badges });
  config = withIconBadgeiOSAsync(config, { badges });

  return config;
};
