const addIconBadge = require('../index');
module.exports = function (config,{ appEnvironment, appIconPath, badgeOverlayPath}) {

  addAppBanners({
    appIconPath: appIconPath,
    badgeOverlayPath: badgeOverlayPath,
    appEnvironment: appEnvironment,
    appVersion: config.version,
  });

  return config;
};