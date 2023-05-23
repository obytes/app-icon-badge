import { addBadge } from '../index';
import path from 'path';

const icon = path.resolve(__dirname, './icon.png');

addBadge({
  icon,
  badges: [
    {
      type: 'ribbon',
      text: 'v1.0.0',
    },
    {
      type: 'banner',
      text: 'dev',
    },
  ],
});
