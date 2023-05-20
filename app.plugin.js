"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// get-add-icon-badge.ts
var import_jimp3 = __toESM(require("jimp"));

// get-env-badge.ts
var import_jimp = __toESM(require("jimp"));
var import_path = __toESM(require("path"));
function getEnvBadge(_0) {
  return __async(this, arguments, function* ({
    environment,
    adaptive = false
  }) {
    if (!environment)
      return null;
    const bannerHeight = adaptive ? 90 : 180;
    const bgColor = "transparent";
    const font = yield import_jimp.default.loadFont(adaptive ? import_jimp.default.FONT_SANS_64_WHITE : import_jimp.default.FONT_SANS_128_WHITE);
    const envBadgePath = import_path.default.resolve(__dirname, adaptive ? "assets/env-badge-adaptive.png" : "assets/env-badge.png");
    const envBadgeOverlay = yield import_jimp.default.read(envBadgePath);
    const width = envBadgeOverlay.bitmap.width;
    const height = envBadgeOverlay.bitmap.height;
    const environmentBadge = new import_jimp.default(width, bannerHeight, bgColor);
    yield environmentBadge.print(
      font,
      0,
      0,
      {
        text: environment.toUpperCase(),
        alignmentX: import_jimp.default.HORIZONTAL_ALIGN_CENTER,
        alignmentY: import_jimp.default.VERTICAL_ALIGN_MIDDLE
      },
      width,
      bannerHeight
    );
    const envResultImage = envBadgeOverlay.composite(
      environmentBadge,
      0,
      height - bannerHeight + 2
    );
    return envResultImage;
  });
}

// get-version-badge.ts
var import_jimp2 = __toESM(require("jimp"));
var import_path2 = __toESM(require("path"));
function getVersionBadge(_0) {
  return __async(this, arguments, function* ({
    version,
    adaptive = false
  }) {
    if (!version)
      return null;
    const bannerHeight = 180;
    const bgColor = "transparent";
    const versionBadgePath = import_path2.default.resolve(__dirname, adaptive ? "assets/version-badge-adaptive.png" : "assets/version-badge.png");
    const font = yield import_jimp2.default.loadFont(adaptive ? import_jimp2.default.FONT_SANS_64_WHITE : import_jimp2.default.FONT_SANS_128_WHITE);
    const versionBadgeOverlay = yield import_jimp2.default.read(versionBadgePath);
    const width = versionBadgeOverlay.bitmap.width;
    const versionBadge = new import_jimp2.default(width, bannerHeight, bgColor);
    yield versionBadge.print(
      font,
      0,
      0,
      {
        text: version,
        alignmentX: import_jimp2.default.HORIZONTAL_ALIGN_CENTER,
        alignmentY: import_jimp2.default.VERTICAL_ALIGN_MIDDLE
      },
      width,
      bannerHeight
    );
    versionBadge.rotate(-45);
    const translateX = adaptive ? 190 : 270;
    const versionResultImage = versionBadgeOverlay.composite(
      versionBadge,
      width - versionBadge.bitmap.width + translateX,
      -translateX
    );
    return versionResultImage;
  });
}

// get-result-path.ts
function getResultPath({ iconPath, environment = "result" }) {
  const iconPathArray = iconPath.split(".");
  iconPathArray.splice(iconPathArray.length - 1, 0, environment);
  const resultFilename = iconPathArray.join(".");
  return resultFilename;
}

// get-add-icon-badge.ts
function addNormalIconBadge(_0) {
  return __async(this, arguments, function* ({ iconPath, environment, version }) {
    let resultImage = yield import_jimp3.default.read(iconPath);
    const environmentBadge = yield getEnvBadge({ environment });
    if (environmentBadge) {
      resultImage.composite(environmentBadge, 0, 0);
    }
    const versionBadge = yield getVersionBadge({ version });
    if (versionBadge) {
      resultImage.composite(versionBadge, 0, 0);
    }
    const resultFilename = getResultPath({
      iconPath,
      environment
    });
    resultImage.writeAsync(resultFilename);
  });
}

// get-add-adaptive-icon-badge.ts
var import_jimp4 = __toESM(require("jimp"));
function addAdaptiveIconBadge(_0) {
  return __async(this, arguments, function* ({ adaptiveIconPath, environment, version }) {
    const imageToResize = yield import_jimp4.default.read(adaptiveIconPath);
    const resizedImage = imageToResize.resize(614, 614);
    const environmentBadge = yield getEnvBadge({ environment, adaptive: true });
    if (environmentBadge) {
      resizedImage.composite(environmentBadge, 0, 0);
    }
    const versionBadge = yield getVersionBadge({ version, adaptive: true });
    if (versionBadge) {
      resizedImage.composite(versionBadge, 0, 0);
    }
    const width = 1024;
    const height = 1024;
    const backgroundColor = 0;
    const compositeImage = new import_jimp4.default(width, height, backgroundColor);
    const x = (width - resizedImage.bitmap.width) / 2;
    const y = (height - resizedImage.bitmap.height) / 2;
    compositeImage.composite(resizedImage, x, y);
    const resultFilename = getResultPath({
      iconPath: adaptiveIconPath,
      environment
    });
    compositeImage.writeAsync(resultFilename);
  });
}

// index.ts
function addIconBadge(_0) {
  return __async(this, arguments, function* ({ iconPath, adaptiveIconPath, environment, version }) {
    yield addNormalIconBadge({ iconPath, environment, version });
    if (adaptiveIconPath) {
      yield addAdaptiveIconBadge({ adaptiveIconPath, environment, version });
    }
  });
}

// app.plugin.ts
function withIconBadge(config, { environment, iconPath, adaptiveIconPath, enabled = true }) {
  if (!enabled)
    return config;
  addIconBadge({
    iconPath,
    adaptiveIconPath,
    environment,
    version: config.version
  });
  return config;
}
module.exports = withIconBadge;
