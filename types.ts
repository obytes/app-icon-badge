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

export type Params = {
  icon: string;
  suffix?: string;
  badges: Array<Banner | Ribbon>;
};
