import Jimp from 'jimp';
import { createBannerBadge } from './create-banner-badge';
import { createRibbonBadge } from './create-ribbon-badge';
import { getResultPath } from './get-result-path';
import { Params } from './types';

export async function addBadge({ icon, suffix, badges = [] }: Params) {
  const resultImage = await Jimp.read(icon);

  for (const badge of badges) {
    const badgeImage =
      badge.type === 'ribbon'
        ? await createRibbonBadge(badge)
        : await createBannerBadge(badge);

    if (badgeImage) {
      resultImage.composite(badgeImage, 0, 0);
    }
  }

  // Save the result image to a file with custom suffix
  const resultFilename = getResultPath({ icon, suffix });
  resultImage.writeAsync(resultFilename);
  return resultFilename;
}
