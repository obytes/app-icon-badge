/**
 * Type definition for iOS theme-based icon configuration
 */
export interface ThemeIconConfig {
  light?: string;
  dark?: string;
  tinted?: string;
}

/**
 * Union type for icon configuration (string or theme-based object)
 */
export type IconConfig = string | ThemeIconConfig;

/**
 * Type guard to check if icon config is theme-based (object with variants)
 * @param iconConfig - Icon configuration to check
 * @returns True if config is theme-based object
 */
export const isThemeIconConfig = (iconConfig: IconConfig | undefined): iconConfig is ThemeIconConfig => {
  return typeof iconConfig === 'object' && 
         iconConfig !== null && 
         ('light' in iconConfig || 'dark' in iconConfig || 'tinted' in iconConfig);
};