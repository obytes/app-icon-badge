import { addIconBadge } from '../index';
import path from 'path';

const iconPath = path.resolve(__dirname, './icon.png');

addIconBadge({
  iconPath,
  version: '3.0.0',
  environment: 'development',
});
