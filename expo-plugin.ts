import { addIconBadge } from './index';

type Params = {
  iconPath: string;
  environment?: string;
  enabled?: boolean;
};
export function withIconBadge(
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
// TODO: Add TYPING for the config object
