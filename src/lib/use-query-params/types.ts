import type { ColorType, GroupType } from "db/types";

export type CategoryArrayParamType = {
  encode: (array: string[]) => string | null | undefined;
  decode: (
    array: string | (string | null)[] | null | undefined
  ) => Array<GroupType>;
};

export type ColorParamType = {
  encode: (str: string) => string | null | undefined;
  decode: (str: string | (string | null)[] | null | undefined) => ColorType;
};
