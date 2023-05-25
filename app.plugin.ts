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
  if (!enabled) return config;

  addBadge({
    icon: icon,
    badges: [
      {
        type: 'ribbon',
        text: config.version,
      },
      {
        type: 'banner',
        text: environment || '',
      },
    ],
  });

  return config;
}
module.exports = withIconBadge;
// TODO: Add TYPING for the config object
