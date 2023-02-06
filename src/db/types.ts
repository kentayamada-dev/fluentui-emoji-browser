import type { COLOR, GROUP } from "db";

export type GroupType = typeof GROUP[number];

export type DBPropertiesType = {
  value: string;
  label: string;
  keywords: string[];
  folderName: string;
  glyph: string;
  unicode: string;
  group: GroupType;
  isMulticolor: boolean;
};

export type DBType = DBPropertiesType[];

export type ColorType = keyof typeof COLOR;
