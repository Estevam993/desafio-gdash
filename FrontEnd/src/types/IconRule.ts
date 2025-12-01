import type {JSX} from "react";

type IconRule = {
  icon: JSX.Element;
  color?: string;
  match: (temp: number) => boolean;
};

export type {IconRule};