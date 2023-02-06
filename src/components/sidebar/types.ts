import type { SearchFiledProps } from "../header/searchField/types";

export type SidebarProps = SearchFiledProps & {
  onCategoriesChange: (categories: string[]) => void;
  onColorChange: (color: string) => void;
  categoriesValue: string[];
  colorValue: string;
  isLargerThanSM: boolean;
};

export type SidebarType = (props: SidebarProps) => JSX.Element;
