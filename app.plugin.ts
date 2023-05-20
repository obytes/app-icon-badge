import { addIconBadge } from './index';

type Params = {
  iconPath: string;
  adaptiveIconPath?: string;
  environment?: string;
  enabled?: boolean;
};
function withIconBadge(
  config: any,
  { environment, iconPath, adaptiveIconPath, enabled = true }: Params
) {
  if(!enabled) return config;
  addIconBadge({
    iconPath: iconPath,
    adaptiveIconPath: adaptiveIconPath,
    environment: environment,
    version: config.version,
  });

  return config;
}
module.exports = withIconBadge;
// TODO: Add TYPING for the config object
