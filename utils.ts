import path from 'path';

const FONT_SANS_128_BLACK = path.resolve(
  __dirname,
  './assets/fonts/open-sans-128-black.fnt'
);
const FONT_SANS_128_WHITE = path.resolve(
  __dirname,
  './assets/fonts/open-sans-128-white.fnt'
);
const FONT_SANS_64_BLACK = path.resolve(
  __dirname,
  './assets/fonts/open-sans-64-black.fnt'
);
const FONT_SANS_64_WHITE = path.resolve(
  __dirname,
  './assets/fonts/open-sans-64-white.fnt'
);

export const getFont = (isAdaptiveIcon: Boolean, isFontBlack: Boolean) =>
  isAdaptiveIcon
    ? isFontBlack
      ? FONT_SANS_64_BLACK
      : FONT_SANS_64_WHITE
    : isFontBlack
      ? FONT_SANS_128_BLACK
      : FONT_SANS_128_WHITE;
