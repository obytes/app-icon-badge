import Jimp from 'jimp';
import path from 'path';
/**
 * @param {string} version // the app version v1.0.0
 * @returns {Promise<Jimp>}
 * @async
 * @function
 * @name getVersionBadge
 * @description
 * Create a new ribbon overlay based on the app version.
 * The version ribbon is a 1024x180 PNG image.
 * The result image is a composite of the app version, version overlay.
 * @example
 * getVersionBadge({
 *  iconPath: './assets/icon.png',
 * version: '3.0.0',
 * });
 */
type Params = {
  version?: string;
  adaptive?: boolean;
};

export async function getVersionBadge({
  version,
  adaptive = false,
}: Params): Promise<Jimp | null> {
  if (!version) return null;
  const bannerHeight = 180;
  const bgColor = 'transparent';

  const versionBadgePath = path.resolve(__dirname, adaptive ? 'assets/version-badge-adaptive.png' : 'assets/version-badge.png');
  const font = await Jimp.loadFont(adaptive ? Jimp.FONT_SANS_64_WHITE : Jimp.FONT_SANS_128_WHITE);
  const versionBadgeOverlay = await Jimp.read(versionBadgePath);
  const width = versionBadgeOverlay.bitmap.width;
  const versionBadge = new Jimp(width, bannerHeight, bgColor);
  await versionBadge.print(
    font,
    0,
    0,
    {
      text: version,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    width,
    bannerHeight
  );
  versionBadge.rotate(-45);
  const translateX = adaptive ? 190 : 270;

  const versionResultImage = versionBadgeOverlay.composite(
    versionBadge,
    width - versionBadge.bitmap.width + translateX,
    -translateX
  );
  return versionResultImage;
}
