import Jimp from 'jimp';
import path from 'path';

/**
 * @param {string} appIcon  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @returns {Promise<Jimp>}
 * @async
 * @function
 * @name getEnvBadge
 * @description
 * Create a new banner overlay based on the app environment.
 * The environment banner is a 1024x180 PNG image.
 * The result image is a composite of the app environment, environment overlay .
 * @example
 * getEnvBadge({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * });
 */
type Params = {
  environment?: string;
  adaptive?: boolean;
};
export async function getEnvBadge({
  environment,
  adaptive = false,
}: Params): Promise<Jimp | null> {
  if (!environment) return null;
  const bannerHeight = adaptive ? 90 : 180;
  const bgColor = 'transparent';
  const font = await Jimp.loadFont(adaptive? Jimp.FONT_SANS_64_WHITE : Jimp.FONT_SANS_128_WHITE);

  const envBadgePath = path.resolve(__dirname, adaptive ? 'assets/env-badge-adaptive.png' :  'assets/env-badge.png');
  const envBadgeOverlay = await Jimp.read(envBadgePath);
  const width = envBadgeOverlay.bitmap.width;
  const height = envBadgeOverlay.bitmap.height;
  const environmentBadge = new Jimp(width, bannerHeight, bgColor);
  await environmentBadge.print(
    font,
    0,
    0,
    {
      text: environment.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    width,
    bannerHeight
  );
  const envResultImage = envBadgeOverlay.composite(
    environmentBadge,
    0,
    height - bannerHeight + 2
  );
  return envResultImage;
}
