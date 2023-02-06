import { UnstyledButton } from "@mantine/core";
import type { GridType } from "./types";
import NextImage from "next/image";
import { memo } from "react";
import { getEmojiFilePath } from "@/utils/getEmojiFilePath";

const Grid: GridType = ({
  folderName,
  value,
  color,
  isMulticolor,
  handleClickEmoji,
}) => (
  <UnstyledButton
    sx={({ fn, colors, colorScheme, spacing, radius }) => ({
      ...fn.hover({
        backgroundColor:
          colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
      }),
      padding: spacing.sm,
      borderRadius: radius.md,
      cursor: "pointer",
    })}
    onClick={() => handleClickEmoji(folderName)}
  >
    <NextImage
      alt={value}
      src={`${getEmojiFilePath({ isMulticolor, folderName, color })}.png`}
      priority
      quality={100}
      width={50}
      height={50}
    />
  </UnstyledButton>
);

export const MemorizedGrid = memo(Grid);
