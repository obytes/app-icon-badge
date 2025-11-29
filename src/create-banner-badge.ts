import { Jimp, loadFont, HorizontalAlign, VerticalAlign } from "jimp";
import type { JimpInstance } from "jimp";
import path from 'path';
import { Banner } from '../types';
import { loadOverlay } from './load-overlay';
import { getFont } from './utils';

export async function createBannerBadge(
  { text, position = 'bottom', color = 'white', background }: Banner,
  isAdaptiveIcon: Boolean = false
): Promise<JimpInstance | null> {
  const IS_POSITION_TOP = position === 'top';
  const BANNER_HEIGHT = isAdaptiveIcon ? 310 : 180; // magic number from banners overlay images
  const OVERLAY_PATH = isAdaptiveIcon
    ? 'assets/banner-overlay-adaptive.png'
    : 'assets/banner-overlay.png';

  const font = await loadFont(getFont(isAdaptiveIcon, color === 'black'));
  const bannerOverlay = await loadOverlay({
    path: path.resolve(__dirname, OVERLAY_PATH),
    background,
  });

  const BANNER_OVERLAY_WIDTH = bannerOverlay.bitmap.width;
  const BANNER_OVERLAY_HEIGHT = bannerOverlay.bitmap.height;

  // create text container image
  const textContainer = new Jimp({
    width: BANNER_OVERLAY_WIDTH,
    height: BANNER_HEIGHT,
    color: 0x00000000,
  });
  textContainer.print({
    font,
    x: 0,
    y: 0,
    text: {text: text.toUpperCase(),
        alignmentX: HorizontalAlign.CENTER,
        alignmentY: isAdaptiveIcon // in adaptive icon mode, the text should be aligned to the opposite side
        ? IS_POSITION_TOP
          ? VerticalAlign.BOTTOM
          : VerticalAlign.TOP
        : VerticalAlign.MIDDLE,
     
    },
    maxWidth: BANNER_OVERLAY_WIDTH,
    maxHeight: BANNER_HEIGHT,
  });

  // compose the text container image with the banner overlay image
  const textContainerY = IS_POSITION_TOP
    ? 0
    : BANNER_OVERLAY_HEIGHT - BANNER_HEIGHT;
  const bannerBadge = bannerOverlay
    .flip({horizontal: false, vertical: IS_POSITION_TOP})
    .composite(textContainer, 0, textContainerY);
  return bannerBadge;
}
