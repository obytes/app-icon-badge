import Jimp from 'jimp';
import path from 'path';
import { Ribbon } from './types';

const RIBBON_HEIGHT = 180;
const RIBBON_ROTATION = -45;

export async function createRibbonBadge({
  position,
  text,
}: Ribbon): Promise<Jimp | null> {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);

  const ribbonOverlay = await Jimp.read(
    path.resolve(__dirname, 'assets/version-badge.png')
  );
  const RIBBON_OVERLAY_WIDTH = ribbonOverlay.bitmap.width;

  // we need a helper image as container for the text as we are going to rotate it later
  const textContainer = new Jimp(
    RIBBON_OVERLAY_WIDTH,
    RIBBON_HEIGHT,
    'transparent'
  );
  await textContainer.print(
    font,
    0,
    0,
    {
      text: text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    RIBBON_OVERLAY_WIDTH,
    RIBBON_HEIGHT
  );
  textContainer.rotate(RIBBON_ROTATION);
  const translateX = 270;

  // compose the text container image with the ribbon overlay image
  const ribbonBadge = ribbonOverlay.composite(
    textContainer,
    RIBBON_OVERLAY_WIDTH - textContainer.bitmap.width + translateX,
    -translateX
  );
  return ribbonBadge;
}
