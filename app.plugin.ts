import { addBadge } from './index';

type Params = {
  icon: string;
  environment?: string;
  customPath?: string;
  enabled?: boolean;
};
function withIconBadge(
  config: any,
  { environment, icon, customPath, enabled = true }: Params
) {
  if (!enabled) return config;

  addBadge({
    icon: icon,
    customPath: customPath,
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
