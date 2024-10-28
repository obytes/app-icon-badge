import Jimp from 'jimp';
import { createBannerBadge } from './create-banner-badge';
import { createRibbonBadge } from './create-ribbon-badge';
import { getResultPath } from './get-result-path';
import { Params } from '../types';

export async function addBadge({
  icon,
  dstPath,
  isAdaptiveIcon = false,
  badges = [],
}: Params) {
  const resultImage = await Jimp.read(icon);

  for (const badge of badges) {
    const badgeImage =
      badge.type === 'ribbon'
        ? await createRibbonBadge(badge, isAdaptiveIcon)
        : await createBannerBadge(badge, isAdaptiveIcon);

    if (badgeImage) {
      resultImage.composite(badgeImage, 0, 0);
    }
  }

  // Save the result image to a file with app environment name as suffix
  const resultFilename = dstPath
    ? dstPath
    : getResultPath({
        icon: icon,
      });
  resultImage.writeAsync(resultFilename);
  return resultFilename;
}
