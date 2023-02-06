import { getEmojiFilePath } from "@/utils/getEmojiFilePath";
import { Center } from "@mantine/core";
import NextImage from "next/image";
import type { ImagePreviewType } from "./types";

export const ImagePreview: ImagePreviewType = ({
  color,
  folderName,
  isLargerThanSM,
  isMulticolor,
  alt,
}) => {
  const emojiSize = isLargerThanSM ? 300 : 150;

  return (
    <Center h="100%">
      <NextImage
        alt={alt}
        src={`${getEmojiFilePath({
          isMulticolor,
          folderName,
          color,
        })}.png`}
        width={emojiSize}
        height={emojiSize}
        priority
        quality={100}
        style={{
          objectFit: "contain",
        }}
      />
    </Center>
  );
};
