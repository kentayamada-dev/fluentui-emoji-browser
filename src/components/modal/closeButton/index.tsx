import type { CloseButtonType } from "./types";
import { CloseButton as MantineCloseButton } from "@mantine/core";

export const CloseButton: CloseButtonType = ({ closeHandler }) => (
  <MantineCloseButton
    aria-label="Close modal"
    pos="absolute"
    right="15px"
    top="15px"
    onClick={closeHandler}
  />
);
