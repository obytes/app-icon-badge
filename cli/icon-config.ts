import { Badge, Params } from '../types';

export class IconConfig {
  icon: string;
  dstPath?: string;
  badges: Array<Badge>;
  isAdaptiveIcon?: boolean;

  constructor({ icon, dstPath, badges, isAdaptiveIcon }: Params) {
    this.badges = badges;
    this.icon = icon;
    this.dstPath = dstPath;
    this.isAdaptiveIcon = isAdaptiveIcon;
  }
}
