import { addIconBadge } from './index';

type Params = {
  iconPath: string;
  environment?: string;
};
export function withIconBadge(config: any, { environment, iconPath }: Params) {
  addIconBadge({
    iconPath: iconPath,
    environment: environment,
    version: config.version,
  });

  return config;
}
// TODO: Add TYPING for the config object
