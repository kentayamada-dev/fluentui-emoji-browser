import type { SidebarProps } from "../sidebar/types";

type LayoutProps = SidebarProps & {
  title: string;
  children: JSX.Element;
  description: string;
};

export type LayoutType = (props: LayoutProps) => JSX.Element;
