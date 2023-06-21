import Jimp from 'jimp';
import path from 'path';
import { Banner } from './types';
import { loadOverlay } from './load-overlay';
import { getFont } from './utils';

export async function createBannerBadge(
  { text, position = 'bottom', color = 'white', background }: Banner,
  isAdaptiveIcon: Boolean = false
): Promise<Jimp | null> {
  const IS_POSITION_TOP = position === 'top';
  const BANNER_HEIGHT = isAdaptiveIcon ? 310 : 180; // magic number from banners overlay images
  const OVERLAY_PATH = isAdaptiveIcon
    ? 'assets/banner-overlay-adaptive.png'
    : 'assets/banner-overlay.png';

  const font = await Jimp.loadFont(getFont(isAdaptiveIcon, color === 'black'));
  const bannerOverlay = await loadOverlay({
    path: path.resolve(__dirname, OVERLAY_PATH),
    background,
  });

  const BANNER_OVERLAY_WIDTH = bannerOverlay.bitmap.width;
  const BANNER_OVERLAY_HEIGHT = bannerOverlay.bitmap.height;

  // create text container image
  const textContainer = new Jimp(
    BANNER_OVERLAY_WIDTH,
    BANNER_HEIGHT,
    'transparent'
  );
  textContainer.print(
    font,
    0,
    0,
    {
      text: text.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: isAdaptiveIcon // in adaptive icon mode, the text should be aligned to the opposite side
        ? IS_POSITION_TOP
          ? Jimp.VERTICAL_ALIGN_BOTTOM
          : Jimp.VERTICAL_ALIGN_TOP
        : Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    BANNER_OVERLAY_WIDTH,
    BANNER_HEIGHT
  );

  // compose the text container image with the banner overlay image
  const textContainerY = IS_POSITION_TOP
    ? 0
    : BANNER_OVERLAY_HEIGHT - BANNER_HEIGHT;
  const bannerBadge = bannerOverlay
    .flip(false, IS_POSITION_TOP)
    .composite(textContainer, 0, textContainerY);
  return bannerBadge;
}
