import { addBadge } from '../src/index';
import path from 'path';

const icon = path.resolve(__dirname, './icon.png');
const adaptiveIcon = path.resolve(__dirname, './adaptive-icon.png');

addBadge({
  icon,
  dstPath: path.resolve(__dirname, './icon.result.png'),
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

addBadge({
  icon: adaptiveIcon,
  isAdaptiveIcon: true,
  dstPath: path.resolve(__dirname, './icon.result-adaptive.png'),
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
