export type GetEmojiFilePathArgs = {
  isMulticolor: boolean;
  folderName: string;
  color: string;
};
export type GetEmojiFilePathType = (args: GetEmojiFilePathArgs) => string;
