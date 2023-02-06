import type { GetEmojiFilePathArgs } from "@/utils/getEmojiFilePath/types";

type ImagePreviewProps = GetEmojiFilePathArgs & {
  isLargerThanSM: boolean;
  alt: string;
};

export type ImagePreviewType = (props: ImagePreviewProps) => JSX.Element;
