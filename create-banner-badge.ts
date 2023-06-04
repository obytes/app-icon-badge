import Jimp from 'jimp';
import path from 'path';
import { Banner } from './types';
import { loadOverlay } from './load-overlay';

const BANNER_HEIGHT = 180;

export async function createBannerBadge({
  text,
  position = 'bottom',
  color = 'white',
  background,
}: Banner): Promise<Jimp | null> {
  const font = await Jimp.loadFont(
    color === 'black' ? Jimp.FONT_SANS_128_BLACK : Jimp.FONT_SANS_128_WHITE
  );
  const bannerOverlay = await loadOverlay({
    path: path.resolve(__dirname, 'assets/env-badge.png'),
    background,
  });

  const RIBBON_OVERLAY_WIDTH = bannerOverlay.bitmap.width;
  const RIBBON_OVERLAY_HEIGHT = bannerOverlay.bitmap.height;

  // create text container image
  const textContainer = new Jimp(
    RIBBON_OVERLAY_WIDTH,
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
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    RIBBON_OVERLAY_WIDTH,
    BANNER_HEIGHT
  );

  // compose the text container image with the banner overlay image
  const flipVertical = position === 'top';
  const textContainerY =
    position === 'top' ? 0 : RIBBON_OVERLAY_HEIGHT - BANNER_HEIGHT;
  const bannerBadge = bannerOverlay
    .flip(false, flipVertical)
    .composite(textContainer, 0, textContainerY);
  return bannerBadge;
}
