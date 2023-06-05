import { addBadge } from '../index';
import path from 'path';

const icon = path.resolve(__dirname, './icon.png');

addBadge({
  icon,
  dstPath: path.resolve(__dirname, './result.png'),
  badges: [
    {
      type: 'banner',
      text: 'Top',
      position: 'top',
      background: '#0045FF',
    },
    {
      type: 'ribbon',
      text: 'Right',
      background: '#FF0000',
      color: 'black',
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
