import Jimp from 'jimp';

export const getFont = (isAdaptiveIcon: Boolean, isFontBlack: Boolean) =>
  isAdaptiveIcon
    ? isFontBlack
      ? Jimp.FONT_SANS_64_BLACK
      : Jimp.FONT_SANS_64_WHITE
    : isFontBlack
    ? Jimp.FONT_SANS_128_BLACK
    : Jimp.FONT_SANS_128_WHITE;
