import type { GetEmojiFilePathType } from "./types";

export const getEmojiFilePath: GetEmojiFilePathType = ({
  isMulticolor,
  folderName,
  color,
}) => `/assets/${folderName}/${isMulticolor ? color : "default"}`;
