import { addIconBadge } from './index';
export function withIconBadge(config: any, { environment, iconPath }: any) {
  addIconBadge({
    iconPath: iconPath,
    environment: environment,
    version: config.version,
  });

  return config;
}
// TODO: Add TYPING for the config object
