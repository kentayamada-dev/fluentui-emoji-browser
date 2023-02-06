import type { ColorType } from "db/types";

export type GridProps = {
  value: string;
  folderName: string;
  color: ColorType;
  isMulticolor: boolean;
  handleClickEmoji: (folderName: string) => void;
};

export type GridType = (props: GridProps) => JSX.Element;
