import { addNormalIconBadge } from './get-add-icon-badge';
import { addAdaptiveIconBadge } from './get-add-adaptive-icon-badge';

/**
 * Add badges to the app icon.
 * @param {Object} params - Parameters for adding badges.
 * @param {string} params.iconPath - Path to the app icon.
 * @param {string} [params.adaptiveIconPath] - Path to the Android foreground icon.
 * @param {string} [params.environment] - The app environment: staging | development | production.
 * @param {string} [params.version] - The app version (e.g., v1.0.0).
 * @returns {Promise<void>}
 * Create a new app icon with a banner and version ribbon overlay based on the app environment and version.
 * The app icon is a 1024x1024 PNG image.
 * The badge overlay is a 1024x1024 PNG image.
 * The environment banner is a 1024x180 PNG image.
 * The version ribbon is a 1024x180 PNG image.
 * The result image is a 1024x1024 PNG image.
 * The result image is a composite of the app icon, badge overlay, environment banner, and version ribbon.
 * The result image is saved to a file with the app environment name as suffix.
 * @example
 * addBadges({
 * iconPath: './assets/icon.png',
 * adaptiveIconPath: './assets/adaptiveIcon.png,
 * environment: 'development',
 * version: '3.0.0',
 * });
 */


type Params = {
  iconPath: string;
  adaptiveIconPath?: string;
  environment?: string;
  version?: string;
};

export async function addIconBadge({ iconPath, adaptiveIconPath, environment, version }: Params) {
  await addNormalIconBadge({ iconPath, environment, version });
  
  if (adaptiveIconPath) {
    await addAdaptiveIconBadge({ adaptiveIconPath, environment, version });
  }
}
