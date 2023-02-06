import type { TextProps } from "@mantine/core";

export type TextCopyButtonProps = {
  value: string;
  fontSize?: TextProps["fz"];
};

export type TextCopyButtonType = (props: TextCopyButtonProps) => JSX.Element;
