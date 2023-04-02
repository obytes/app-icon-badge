const Jimp = require("jimp");

/**
 * @param {string} iconPath  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @returns {string}
 * @function
 * @name getResultPath
 * @description
 * get the result image path based on the app environment.
 * @example
 * getResultPath({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * });
 */

function getResultPath({ iconPath, environment }) {
  const iconPathArray = iconPath.split(".");
  const suffix = typeof environment === "string" ? environment : "result";
  iconPathArray.splice(iconPathArray.length - 1, 0, suffix);
  const resultFilename = iconPathArray.join(".");
  return resultFilename;
}

/**
 * @param {string} appIcon  // path to the app icon
 * @param {string} version // the app version v1.0.0
 * @returns {Promise<Jimp>}
 * @async
 * @function
 * @name getVersionBadge
 * @description
 * Create a new ribbon overlay based on the app version.
 * The version ribbon is a 1024x180 PNG image.
 * The result image is a composite of the app version, version overlay.
 * @example
 * getVersionBadge({
 *  iconPath: './assets/icon.png',
 * version: '3.0.0',
 * });
 */

async function getVersionBadge({ iconPath, version }) {
  const bannerHeight = 180;
  const bgColor = "transparent";
  const versionBadgePath = "./assets/version-badge.png";
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  const appIcon = await Jimp.read(iconPath);
  const versionBadgeOverlay = await Jimp.read(versionBadgePath);

  const versionBadge = new Jimp(appIcon.bitmap.width, bannerHeight, bgColor);
  await versionBadge.print(
    font,
    0,
    0,
    {
      text: version,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    appIcon.bitmap.width,
    bannerHeight
  );
  versionBadge.rotate(-45);
  const translateX = 270;

  const versionResultImage = versionBadgeOverlay.composite(
    versionBadge,
    appIcon.bitmap.width - versionBadge.bitmap.width + translateX,
    -translateX
  );
  return versionResultImage;
}

/**
 * @param {string} appIcon  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @returns {Promise<Jimp>}
 * @async
 * @function
 * @name getEnvBadge
 * @description
 * Create a new banner overlay based on the app environment.
 * The environment banner is a 1024x180 PNG image.
 * The result image is a composite of the app environment, environment overlay .
 * @example
 * getEnvBadge({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * });
 */
async function getEnvBadge({ iconPath, environment }) {
  const bannerHeight = 180;
  const bgColor = "transparent";
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  const envBadgePath = "./assets/env-badge.png";
  const appIcon = await Jimp.read(iconPath);
  const envBadgeOverlay = await Jimp.read(envBadgePath);
  const environmentBadge = new Jimp(
    appIcon.bitmap.width,
    bannerHeight,
    bgColor
  );
  await environmentBadge.print(
    font,
    0,
    0,
    {
      text: environment.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    appIcon.bitmap.width,
    bannerHeight
  );
  const envResultImage = envBadgeOverlay.composite(
    environmentBadge,
    0,
    appIcon.bitmap.height - bannerHeight + 2
  );
  return envResultImage;
}

/**
 * @param {string} iconPath  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @param {string} version // the app version v1.0.0
 * @returns {Promise<void>}
 * @async
 * @function
 * @name addIconBadge
 * @description
 * Create a new app icon with a banner and version ribbon overlay based on the app environment and version.
 * The app icon is a 1024x1024 PNG image.
 * The badge overlay is a 1024x1024 PNG image.
 * The environment banner is a 1024x180 PNG image.
 * The version ribbon is a 1024x180 PNG image.
 * The result image is a 1024x1024 PNG image.
 * The result image is a composite of the app icon, badge overlay, environment banner, and version ribbon.
 * The result image is saved to a file with the app environment name as suffix.
 * @example
 * addIconBadge({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * version: '3.0.0',
 * });
 */

async function addIconBadge({ iconPath, environment, version }) {
  let resultImage = await Jimp.read(iconPath);

  //Create the environment banner image
  if (typeof environment === "string") {
    const environmentBadge = await getEnvBadge({ iconPath, environment });
    resultImage.composite(environmentBadge, 0, 0);
  }

  // Create the version badge image and rotate it
  if (typeof version === "string") {
    const versionBadge = await getVersionBadge({ iconPath, version });
    resultImage.composite(versionBadge, 0, 0);
  }

  // Save the result image to a file with app environment name as suffix
  const resultFilename = getResultPath({
    iconPath: iconPath,
    environment: environment,
  });
  resultImage.writeAsync(resultFilename);
}

module.exports = addIconBadge;
