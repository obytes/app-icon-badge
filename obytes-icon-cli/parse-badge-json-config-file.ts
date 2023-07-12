import fs from 'fs';
import type { Params } from '../types';
import { validateConfig } from './config-validation';
import path from 'path';
import chalk from 'chalk';
import { addBadge } from 'app-icon-badge';

export function parseBadgeJsonConfigFile(filePath: string) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(
      chalk.red(`'${resolvedPath}'`, 'File does not exist in this path')
    );
    return false;
  }
  let badgeConfig: Params[] | null = null;
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    badgeConfig = JSON.parse(data);
    if (badgeConfig && validateConfig(badgeConfig)) {
      badgeConfig.forEach((config: Params) => {
        addBadge(config);
      });
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
