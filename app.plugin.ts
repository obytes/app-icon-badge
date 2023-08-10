import { addBadge } from './index';
import { Badge } from './types';

const DST_APP_ICON_BADGE_FOLDER = '.expo/app-icon-badge';
const DST_ICON = `${DST_APP_ICON_BADGE_FOLDER}/icon.png`;
const DST_ADAPTIVE_APP_ICON = `${DST_APP_ICON_BADGE_FOLDER}/foregroundImage.png`;

type Params = {
  badges: Array<Badge>;
  enabled?: boolean;
};

function withIconBadge(config: any, { badges, enabled = true }: Params) {
  if (!enabled) return config;

  try {
    // get source paths from config
    const iconPath = config?.icon;
    const adaptiveIconPath = config?.android?.adaptiveIcon?.foregroundImage;
    // TODO: add more checks for the config object

    // Generate icon with badge
    // normally addBadge is async but we don't need to wait for it also not sure how to use async in this context
    if (iconPath) {
      addBadge({
        icon: iconPath,
        dstPath: DST_ICON,
        badges,
      });
      config.icon = DST_ICON;
    }

    // waiting for the adaptive icon support here
    if (adaptiveIconPath) {
      addBadge({
        isAdaptiveIcon: true,
        icon: adaptiveIconPath,
        dstPath: DST_ADAPTIVE_APP_ICON,
        badges,
      });
      config.android.adaptiveIcon.foregroundImage = DST_ADAPTIVE_APP_ICON;
    }

    return config;
  } catch (error) {
    return config;
  }
}
module.exports = withIconBadge;
