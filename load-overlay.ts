import Jimp from 'jimp';
import convert from 'color-convert';
import deltaE from 'delta-e';

type Params = {
  path: string;
  background?: string;
};

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export async function loadOverlay({ path, background }: Params): Promise<Jimp> {
  const bannerOverlay = await Jimp.read(path);

  if (background !== undefined && !HEX_COLOR_REGEX.test(background)) {
    console.warn(
      `Invalid background color: ${background} - must be a hex color, #000000 has been used as default value`
    );
    return bannerOverlay;
  }

  if (background !== undefined && HEX_COLOR_REGEX.test(background)) {
    return replaceColor({
      image: bannerOverlay,
      from: '#000000',
      to: background,
    });
  }

  return bannerOverlay;
}

type ParamsRC = {
  image: Jimp;
  from: string;
  to: string;
};

const replaceColor = ({ image, from, to }: ParamsRC) => {
  const fromColor = convert.hex.lab(from); // [R, G, B]
  const toColor = convert.hex.rgb(to); // [R, G, B]

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    // in case of transparent pixels we will skip them
    if (image.bitmap.data[idx + 3] === 0) {
      return;
    }
    // we convert the current pixel to LAB color space
    const currentLABColor = convert.rgb.lab([
      image.bitmap.data[idx],
      image.bitmap.data[idx + 1],
      image.bitmap.data[idx + 2],
    ]);
    // check if the current pixel is close to the from color in LAB color space
    // replace the current pixel with the to color
    if (getDelta(currentLABColor, fromColor) <= 2.3) {
      image.bitmap.data[idx] = toColor[0];
      image.bitmap.data[idx + 1] = toColor[1];
      image.bitmap.data[idx + 2] = toColor[2];
    }
  });

  return image;
};

const getDelta = (LAB1: Array<number>, LAB2: Array<number>) => {
  return deltaE[`getDeltaE00`](
    { L: LAB1[0], A: LAB1[1], B: LAB1[2] },
    { L: LAB2[0], A: LAB2[1], B: LAB2[2] }
  );
};
