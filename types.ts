export type Banner = {
  type: 'banner';
  text: string;
  position?: 'top' | 'bottom';
  color?: string;
  background?: string;
};

export type Ribbon = {
  type: 'ribbon';
  text: string;
  position?: 'left' | 'right';
  color?: string;
  background?: string;
};

export type Params = {
  icon: string;
  badges: Array<Banner | Ribbon>;
};
