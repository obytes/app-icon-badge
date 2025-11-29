import { Jimp, loadFont, HorizontalAlign, VerticalAlign} from "jimp";
import type { JimpInstance } from "jimp";
import path from 'path';
import { Ribbon } from '../types';
import { loadOverlay } from './load-overlay';
import { getFont } from './utils';

const RIBBON_ROTATION_RIGHT = -45;
const RIBBON_ROTATION_LEFT = 45;

export async function createRibbonBadge(
  { position = 'right', text, color = 'white', background }: Ribbon,
  isAdaptiveIcon: Boolean = false
): Promise<JimpInstance | null> {
  const IS_FONT_BLACK = color === 'black';
  const IS_POSITION_LEFT = position === 'left';
  const RIBBON_HEIGHT = isAdaptiveIcon ? 100 : 180; // magic number from banners overlay images
  const TRANSLATE_BY = isAdaptiveIcon ? 80 : 270;
  const OVERLAY_PATH = isAdaptiveIcon
    ? 'assets/ribbon-overlay-adaptive.png'
    : 'assets/ribbon-overlay.png';

  const font = await loadFont(getFont(isAdaptiveIcon, IS_FONT_BLACK));

  const ribbonOverlay = await loadOverlay({
    path: path.resolve(__dirname, OVERLAY_PATH),
    background,
  });
  const RIBBON_OVERLAY_WIDTH = ribbonOverlay.bitmap.width;

  // we need a helper image as container for the text as we are going to rotate it later
  const textContainer = new Jimp({
    width: RIBBON_OVERLAY_WIDTH,
    height: RIBBON_HEIGHT,
    color: 0x00000000,
  });
  textContainer.print(
    {font,
      text: {text,
        alignmentX: HorizontalAlign.CENTER,
      alignmentY: VerticalAlign.MIDDLE,
      },
      x: 0,
      y: 0,

      maxWidth: RIBBON_OVERLAY_WIDTH,
      maxHeight: RIBBON_HEIGHT,
    },
  );
  textContainer.rotate(
    IS_POSITION_LEFT ? RIBBON_ROTATION_LEFT : RIBBON_ROTATION_RIGHT
  );

  const TRANSLATE_X = IS_POSITION_LEFT ? -TRANSLATE_BY : TRANSLATE_BY;
  const FLIP_HORIZONTAL = IS_POSITION_LEFT;
  const TEXT_CONTAINER_X = IS_POSITION_LEFT
    ? TRANSLATE_X
    : RIBBON_OVERLAY_WIDTH - textContainer.bitmap.width + TRANSLATE_X;
  const TEXT_CONTAINER_Y = IS_POSITION_LEFT ? TRANSLATE_X : -TRANSLATE_X;

  // compose the text container image with the ribbon overlay image
  const ribbonBadge = ribbonOverlay
    .flip({horizontal: FLIP_HORIZONTAL, vertical: false})
    .composite(textContainer, TEXT_CONTAINER_X, TEXT_CONTAINER_Y);
  return ribbonBadge;
}
