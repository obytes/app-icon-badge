import Jimp from 'jimp';
import path from 'path';
import { Ribbon } from './types';
import { loadOverlay } from './load-overlay';

const RIBBON_HEIGHT = 180;
const RIBBON_ROTATION_RIGHT = -45;
const RIBBON_ROTATION_LEFT = 45;

export async function createRibbonBadge({
  position = 'right',
  text,
  color = 'white',
  background,
}: Ribbon): Promise<Jimp | null> {
  const font = await Jimp.loadFont(
    color === 'black' ? Jimp.FONT_SANS_128_BLACK : Jimp.FONT_SANS_128_WHITE
  );

  const ribbonOverlay = await loadOverlay({
    path: path.resolve(__dirname, 'assets/version-badge.png'),
    background,
  });
  const RIBBON_OVERLAY_WIDTH = ribbonOverlay.bitmap.width;

  // we need a helper image as container for the text as we are going to rotate it later
  const textContainer = new Jimp(
    RIBBON_OVERLAY_WIDTH,
    RIBBON_HEIGHT,
    'transparent'
  );
  textContainer.print(
    font,
    0,
    0,
    {
      text: text,
      color: 'red',
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    RIBBON_OVERLAY_WIDTH,
    RIBBON_HEIGHT
  );
  textContainer.rotate(
    position === 'right' ? RIBBON_ROTATION_RIGHT : RIBBON_ROTATION_LEFT
  );

  const TRANSLATE_X = position === 'right' ? 270 : -270;
  const FLIP_HORIZONTAL = position === 'left';
  const TEXT_CONTAINER_X =
    position === 'left'
      ? TRANSLATE_X
      : RIBBON_OVERLAY_WIDTH - textContainer.bitmap.width + TRANSLATE_X;
  const TEXT_CONTAINER_Y = position === 'left' ? TRANSLATE_X : -TRANSLATE_X;

  // compose the text container image with the ribbon overlay image
  const ribbonBadge = ribbonOverlay
    .flip(FLIP_HORIZONTAL, false)
    .composite(textContainer, TEXT_CONTAINER_X, TEXT_CONTAINER_Y);
  return ribbonBadge;
}
