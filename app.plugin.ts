import { addBadge } from './index';

type Params = {
  icon: string;
  environment?: string;
  enabled?: boolean;
};
function withIconBadge(
  config: any,
  { environment, icon, enabled = true }: Params
) {
  if(!enabled) return config;
  addBadge({
    icon: icon,
    environment: environment,
    version: config.version,
  });

  return config;
}
module.exports = withIconBadge;
// TODO: Add TYPING for the config object
