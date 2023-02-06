import type { CloseButtonProps as MantineCloseButtonProps } from "@mantine/core";

type CloseButtonProps = {
  closeHandler: MantineCloseButtonProps["onClick"];
};

export type CloseButtonType = (props: CloseButtonProps) => JSX.Element;
