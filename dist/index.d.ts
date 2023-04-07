/**
 * @param {string} iconPath  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @param {string} version // the app version v1.0.0
 * @returns {Promise<void>}
 * @async
 * @function
 * @name addIconBadge
 * @description
 * Create a new app icon with a banner and version ribbon overlay based on the app environment and version.
 * The app icon is a 1024x1024 PNG image.
 * The badge overlay is a 1024x1024 PNG image.
 * The environment banner is a 1024x180 PNG image.
 * The version ribbon is a 1024x180 PNG image.
 * The result image is a 1024x1024 PNG image.
 * The result image is a composite of the app icon, badge overlay, environment banner, and version ribbon.
 * The result image is saved to a file with the app environment name as suffix.
 * @example
 * addIconBadge({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * version: '3.0.0',
 * });
 */
type Params = {
    iconPath: string;
    environment?: string;
    version?: string;
    options?: {
        badgePath?: string;
        envBadgePath?: string;
    };
};
declare function addIconBadge({ iconPath, environment, version }: Params): Promise<void>;

export { addIconBadge };
