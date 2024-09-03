import { addBadge } from './index';
import { Badge } from './types';
import { withDangerousMod } from '@expo/config-plugins'

const DST_APP_ICON_BADGE_FOLDER = '.expo/app-icon-badge';
const DST_ICON = `${DST_APP_ICON_BADGE_FOLDER}/icon.png`;
const DST_IOS_ICON = `${DST_APP_ICON_BADGE_FOLDER}/ios-icon.png`;
const DST_ADAPTIVE_APP_ICON = `${DST_APP_ICON_BADGE_FOLDER}/foregroundImage.png`;

type Params = {
  badges: Array<Badge>;
  enabled?: boolean;
};


async function withIcon(config: any, badges: Array<Badge>) {
  
  const iconPath = config?.icon;
  
  if (iconPath) {
    await addBadge({
      icon: iconPath,
      dstPath: DST_ICON,
      badges,
    }).catch(() => {}); // we silently fail to prevent error in android build process

    config.icon = DST_ICON;
  }
  return config
}

function withIconBadgeiOS(config: any, badges: Array<Badge>) {
  return withDangerousMod(config, [
    "ios",
    async (config) => {

      // Update the main icon
      config = await withIcon(config, badges)

      const iconPath = config?.ios?.icon;
  
      if (iconPath) {
        await addBadge({
          icon: iconPath,
          dstPath: DST_ICON,
          badges,
        }).catch(() => {}); // we silently fail to prevent error in android build process
    
        config!.ios!.icon = DST_ICON;
      }

      return config;
    }
  ]);
  

  
}

function withIconBadgeAndroid(config: any, badges: Array<Badge>) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      // Update the main icon
      config = await withIcon(config, badges)

      const adaptiveIconPath = config?.android?.adaptiveIcon?.foregroundImage;
      console.log("Android Icon path", adaptiveIconPath)

      // Generate icon with badge
      if (adaptiveIconPath) {
        await addBadge({
          icon: adaptiveIconPath,
          dstPath: DST_ADAPTIVE_APP_ICON,
          badges,
        }).catch(() => {
        }); // we silently fail to prevent error in android build process

        config.android!.adaptiveIcon!.foregroundImage = DST_ADAPTIVE_APP_ICON;
      }

      return config;
    },
    
  ]);
}

function withIconBadge(config: any, { badges, enabled = true }: Params) {
  if (!enabled) return config;

  config = withIconBadgeAndroid(config, badges);
  config = withIconBadgeiOS(config, badges);

  return config;
}
module.exports = withIconBadge;
