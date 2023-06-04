import { addBadge } from './index';

type Params = {
  icon: string;
  environment?: string;
  dstPath?: string;
  enabled?: boolean;
};
function withIconBadge(
  config: any,
  { environment, icon, dstPath, enabled = true }: Params
) {
  if (!enabled) return config;

  addBadge({
    icon: icon,
    dstPath: dstPath,
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
