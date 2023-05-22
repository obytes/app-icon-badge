import { addBadge } from '../index';
import path from 'path';

const icon = path.resolve(__dirname, './icon.png');

addBadge({
  icon,
  version: '3.0.0',
  environment: 'development',
});
