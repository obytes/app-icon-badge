const addIconBadge = require('../index');
module.exports = function (config,{ environment, iconPath}) {

  addIconBadge({
    iconPath: iconPath,
    environment: environment,
    version: config.version,
  });

  return config;
};