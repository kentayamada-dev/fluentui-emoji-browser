import { CopyButton as MantineCopyButton, Tooltip, Text } from "@mantine/core";
import type { TextCopyButtonType } from "./types";

export const TextCopyButton: TextCopyButtonType = ({
  value,
  fontSize = "md",
}) => (
  <MantineCopyButton value={value} timeout={1000}>
    {({ copied, copy }) => (
      <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
        <Text
          fz={fontSize}
          onClick={copy}
          sx={({ fn, colors, colorScheme }) => ({
            maxWidth: "fit-content",
            ...fn.hover({
              backgroundColor:
                colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
            }),
            cursor: "pointer",
          })}
        >
          {value}
        </Text>
      </Tooltip>
    )}
  </MantineCopyButton>
);
