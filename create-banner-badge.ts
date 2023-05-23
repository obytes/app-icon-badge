import Jimp from 'jimp';
import path from 'path';
import { Banner } from './types';

const BANNER_HEIGHT = 180;

export async function createBannerBadge({
  text,
  position,
}: Banner): Promise<Jimp | null> {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);

  const bannerOverlay = await Jimp.read(
    path.resolve(__dirname, 'assets/env-badge.png')
  );

  const RIBBON_OVERLAY_WIDTH = bannerOverlay.bitmap.width;
  const RIBBON_OVERLAY_HEIGHT = bannerOverlay.bitmap.height;

  // create text container image
  const textContainer = new Jimp(
    RIBBON_OVERLAY_WIDTH,
    BANNER_HEIGHT,
    'transparent'
  );
  await textContainer.print(
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
  const bannerBadge = bannerOverlay.composite(
    textContainer,
    0,
    RIBBON_OVERLAY_HEIGHT - BANNER_HEIGHT + 2
  );
  return bannerBadge;
}
