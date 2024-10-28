export type Banner = {
  type: 'banner';
  text: string;
  position?: 'top' | 'bottom';
  color?: 'white' | 'black';
  background?: string;
};

export type Ribbon = {
  type: 'ribbon';
  text: string;
  position?: 'left' | 'right';
  color?: 'white' | 'black';
  background?: string;
};

export type Badge = Banner | Ribbon;

export type Params = {
  icon: string;
  dstPath?: string;
  badges: Array<Badge>;
  isAdaptiveIcon?: boolean;
};

export type AppIconBadgeConfig = {
  badges: Array<Badge>;
  enabled?: boolean;
};
