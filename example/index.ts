import { addBadge } from '../index';
import path from 'path';

const icon = path.resolve(__dirname, './icon.png');

addBadge({
  icon,
  badges: [
    {
      type: 'banner',
      text: 'Top',
      position: 'top',
    },
    {
      type: 'ribbon',
      text: 'Right',
    },
    {
      type: 'ribbon',
      text: 'Left',
      position: 'left',
    },
    {
      type: 'banner',
      position: 'bottom',
      text: 'Bottom',
    },
  ],
});
