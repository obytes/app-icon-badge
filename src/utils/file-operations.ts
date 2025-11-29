import * as fs from 'fs';
import * as path from 'path';
import { addBadgeSync } from '../add-badge-sync';

/**
 * Utility function to ensure directory exists
 * @param dirPath - Directory path to create
 */
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Utility function to generate a badged icon with proper error handling
 * @param iconPath - Source icon path
 * @param destPath - Destination path for badged icon
 * @param badges - Array of badge configurations
 * @param isAdaptiveIcon - Whether this is an adaptive icon
 */
export const generateBadgedIcon = (iconPath: string, destPath: string, badges: any[], isAdaptiveIcon = false): void => {
  try {
    ensureDirectoryExists(path.dirname(destPath));
    addBadgeSync({
      icon: iconPath,
      dstPath: destPath,
      badges,
      isAdaptiveIcon,
    });
  } catch (error) {
    console.error(`Failed to generate badged icon for ${iconPath}:`, error);
    throw error;
  }
};