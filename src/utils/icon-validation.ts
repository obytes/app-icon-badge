import * as fs from 'fs';
import * as path from 'path';
import type { IconConfig, ThemeIconConfig } from '../types/icon-config';
import { isThemeIconConfig } from '../types/icon-config';

/**
 * Helper function to validate if a file path exists and is a valid icon format
 * @param iconPath - Path to the icon file
 * @returns True if valid, false otherwise
 */
export const validateIconPath = (iconPath: string): boolean => {
  if (!fs.existsSync(iconPath)) {
    console.warn(`Icon file not found: ${iconPath}`);
    return false;
  }
  
  const validExtensions = ['.png', '.jpg', '.jpeg'];
  const ext = path.extname(iconPath).toLowerCase();
  if (!validExtensions.includes(ext)) {
    console.warn(`Unsupported icon format: ${ext}. Supported formats: ${validExtensions.join(', ')}`);
    return false;
  }
  
  return true;
};

/**
 * Helper function to extract a single icon path from either string or object format
 * @param iconConfig - Icon configuration (string path or object with theme variants)
 * @returns The icon path to use, or null if not found
 */
export const getIconPath = (iconConfig: IconConfig | undefined): string | null => {
  if (typeof iconConfig === 'string') {
    return validateIconPath(iconConfig) ? iconConfig : null;
  }
  if (isThemeIconConfig(iconConfig)) {
    // Prefer light theme icon, fall back to dark or tinted
    const path = iconConfig.light || iconConfig.dark || iconConfig.tinted;
    return path && validateIconPath(path) ? path : null;
  }
  return null;
};

/**
 * Helper function to get all icon variants from theme config with validation
 * @param iconConfig - Theme-based icon configuration
 * @returns Object with validated icon variant paths
 */
export const getValidIconVariants = (iconConfig: ThemeIconConfig) => {
  return {
    light: iconConfig.light && validateIconPath(iconConfig.light) ? iconConfig.light : null,
    dark: iconConfig.dark && validateIconPath(iconConfig.dark) ? iconConfig.dark : null,
    tinted: iconConfig.tinted && validateIconPath(iconConfig.tinted) ? iconConfig.tinted : null,
  };
};