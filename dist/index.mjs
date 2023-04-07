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

// index.ts
import Jimp3 from "jimp";

// get-env-badge.ts
import Jimp from "jimp";
import path from "path";
function getEnvBadge(_0) {
  return __async(this, arguments, function* ({
    environment
  }) {
    if (!environment)
      return null;
    const bannerHeight = 180;
    const bgColor = "transparent";
    const font = yield Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    const envBadgePath = path.resolve(__dirname, "assets/env-badge.png");
    const envBadgeOverlay = yield Jimp.read(envBadgePath);
    const width = envBadgeOverlay.bitmap.width;
    const height = envBadgeOverlay.bitmap.height;
    const environmentBadge = new Jimp(width, bannerHeight, bgColor);
    yield environmentBadge.print(
      font,
      0,
      0,
      {
        text: environment.toUpperCase(),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
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
import Jimp2 from "jimp";
import path2 from "path";
function getVersionBadge(_0) {
  return __async(this, arguments, function* ({
    version
  }) {
    if (!version)
      return null;
    const bannerHeight = 180;
    const bgColor = "transparent";
    const versionBadgePath = path2.resolve(__dirname, "assets/version-badge.png");
    const font = yield Jimp2.loadFont(Jimp2.FONT_SANS_128_WHITE);
    const versionBadgeOverlay = yield Jimp2.read(versionBadgePath);
    const width = versionBadgeOverlay.bitmap.width;
    const versionBadge = new Jimp2(width, bannerHeight, bgColor);
    yield versionBadge.print(
      font,
      0,
      0,
      {
        text: version,
        alignmentX: Jimp2.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp2.VERTICAL_ALIGN_MIDDLE
      },
      width,
      bannerHeight
    );
    versionBadge.rotate(-45);
    const translateX = 270;
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

// expo-plugin.ts
function withIconBadge(config, { environment, iconPath }) {
  addIconBadge({
    iconPath,
    environment,
    version: config.version
  });
  return config;
}

// index.ts
function addIconBadge(_0) {
  return __async(this, arguments, function* ({ iconPath, environment, version }) {
    let resultImage = yield Jimp3.read(iconPath);
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
export {
  addIconBadge,
  withIconBadge
};
