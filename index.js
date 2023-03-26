const Jimp = require('jimp');

/**
 * @param {string} appIconPath  // path to the app icon
 * @param {string} appEnvironment // the app environment staging | development | production
 * @param {string} appVersion // the app version v1.0.0
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
 *  appIconPath: './assets/icon.png',
 * appEnvironment: 'development',
 * appVersion: '3.0.0',
 * });
 */

 async function addIconBadge({
  appIconPath,
  appEnvironment,
  appVersion,
}) {
  const envBadgePath='./assets/env-badge.png';
  const versionBadgePath='./assets/version-badge.png';

  const appIcon = await Jimp.read(appIconPath);
  const envBadgeOverlay = await Jimp.read(envBadgePath);
  const versionBadgeOverlay = await Jimp.read(versionBadgePath);
  const bannerHeight = 180;
  const bgColor = 'transparent';
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  let resultImage= undefined;

  if (typeof appEnvironment === 'string') {
      // Create the environment banner image
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
          text: appEnvironment.toUpperCase(),
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        appIcon.bitmap.width,
        bannerHeight
      );
      // Combine the app icon, envBadgeOverlay environment banner
      resultImage = await appIcon
      .composite(envBadgeOverlay, 0, 0)
      .composite(environmentBadge, 0, appIcon.bitmap.height - bannerHeight + 2)
  }


  if (typeof appVersion === 'string') {
      // Create the version badge image and rotate it
      const versionBadge = new Jimp(appIcon.bitmap.width, bannerHeight, bgColor);
      await versionBadge.print(
        font,
        0,
        0,
        {
          text: appVersion,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        appIcon.bitmap.width,
        bannerHeight
      );
      versionBadge.rotate(-45);
      const translateX = 270; // this one to make sure is in the right position, its a magic number :D get it by testing and tweaking it with real results
      //Combine the app icon, versionBadgeOverlay, version banner
      if(typeof resultImage === 'undefined')
        {
          versionResultImage = await appIcon
          .composite(versionBadgeOverlay, 0, 0)
          .composite(
            versionBadge,
            appIcon.bitmap.width - versionBadge.bitmap.width + translateX,
            -translateX
          );}
      
      else 
      { versionResultImage = await resultImage
          .composite(versionBadgeOverlay, 0, 0)
          .composite(
            versionBadge,
            appIcon.bitmap.width - versionBadge.bitmap.width + translateX,
            -translateX
          );}
  }

  // Save the result image to a file with app environment name as suffix
  const iconPathArray = appIconPath.split('.');
  const suffix= typeof appEnvironment === 'string' ? appEnvironment : 'result';
  iconPathArray.splice(iconPathArray.length - 1, 0, suffix);
  const resultFilename = iconPathArray.join('.');
  resultImage = typeof resultImage === 'undefined' ? appIcon : resultImage;
  await resultImage.writeAsync(resultFilename);
};

addIconBadge({
  appIconPath: './assets/icon.png',
  appEnvironment: 'development',
  appVersion: '3.0.0',
  });
  
module.exports = addIconBadge;