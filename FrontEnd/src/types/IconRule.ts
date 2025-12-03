
type IconRule<T> = {
  icon: string;
  match: (value: T) => boolean;
};

export type {IconRule};