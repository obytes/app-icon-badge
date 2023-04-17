import { addIconBadge } from './index';

type Params = {
  iconPath: string;
  environment?: string;
  enabled?: boolean;
};
function withIconBadge(
  config: any,
  { environment, iconPath, enabled = true }: Params
) {
  if(!enabled) return config;
  addIconBadge({
    iconPath: iconPath,
    environment: environment,
    version: config.version,
  });

  return config;
}
module.exports = withIconBadge;
// TODO: Add TYPING for the config object
