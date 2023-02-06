import type { SidebarProps } from "../sidebar/types";
import type { GridProps } from "./grid/types";

type GridsProps = Pick<
  SidebarProps,
  "categoriesValue" | "queriesValue" | "colorValue"
> &
  Pick<GridProps, "handleClickEmoji">;

export type GridsType = (props: GridsProps) => JSX.Element;
