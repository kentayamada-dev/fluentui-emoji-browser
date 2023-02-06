import type { RemoveNullFromArrayType } from "./types";

export const removeNullFromArray: RemoveNullFromArrayType = (array) =>
  array.flatMap((e) => (e != null ? e : []));
