import { COLOR, GROUP } from "db";
import type { ColorType, GroupType } from "db/types";
import {
  encodeString,
  decodeString,
  encodeDelimitedArray,
  decodeDelimitedArray,
} from "use-query-params";
import type { CategoryArrayParamType, ColorParamType } from "./types";

export const ColorParam: ColorParamType = {
  encode: (str) => encodeString(str),
  decode: (str) => {
    const decodeStr = decodeString(str) as ColorType;
    if (Object.keys(COLOR).includes(decodeStr)) {
      return decodeStr;
    }
    return "default";
  },
};

export const CategoryArrayParam: CategoryArrayParamType = {
  encode: (array) => encodeDelimitedArray(array, "_"),
  decode: (array) => {
    const decodeStr =
      (decodeDelimitedArray(array, "_") as Array<GroupType>) ?? [];
    return decodeStr.filter((elem) => GROUP.includes(elem));
  },
};
