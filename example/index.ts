import { addIconBadge } from '../index';
import path from 'path';

const iconPath = path.resolve(__dirname, './icon.png');
const adaptiveIconPath = path.resolve(__dirname, './adaptiveIcon.png');

addIconBadge({
  iconPath,
  adaptiveIconPath,
  version: '3.0.0',
  environment: 'development',
});
