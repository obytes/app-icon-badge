import Jimp from 'jimp';
import { getEnvBadge } from './get-env-badge';
import { getVersionBadge } from './get-version-badge';
import { getResultPath } from './get-result-path';

/**
 * Add adaptive icon badges based on the app environment and version.
 * @param {Object} params - Parameters for adding adaptive icon badges.
 * @param {string} adaptiveIconPath - Path to the Android foreground icon.
 * @param {string} environment - The app environment: staging | development | production.
 * @param {string} version - The app version (e.g., v1.0.0).
 * @returns {Promise<void>}
 */

type Params = {
  adaptiveIconPath: string;
  environment?: string;
  version?: string;
};
export async function addAdaptiveIconBadge({ adaptiveIconPath, environment, version }: Params) {
  const imageToResize = await Jimp.read(adaptiveIconPath);

  //resize image size based on expo guide in figma
  const resizedImage = imageToResize.resize(614, 614);

  // Create the environment banner image
  const environmentBadge = await getEnvBadge({ environment, adaptive: true });

  if (environmentBadge) {
    resizedImage.composite(environmentBadge, 0, 0);
  }

  // Create the version badge image and rotate it
  const versionBadge = await getVersionBadge({ version, adaptive: true });

  if (versionBadge) {
    resizedImage.composite(versionBadge, 0, 0);
  }

  // size based on expo guide
  const width = 1024;
  const height = 1024;
  const backgroundColor = 0x00000000; // Transparent background

  const compositeImage = new Jimp(width, height, backgroundColor);

  const x = (width - resizedImage.bitmap.width) / 2;
  const y = (height - resizedImage.bitmap.height) / 2;

  compositeImage.composite(resizedImage, x, y);

  // Save the result image to a file with app environment name as suffix
  const resultFilename = getResultPath({
    iconPath: adaptiveIconPath,
    environment: environment,
  });
  compositeImage.writeAsync(resultFilename);
}
