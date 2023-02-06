import { isDesktop, isWindows, isMacOs } from "react-device-detect";
import type { GetCmdOrCtrlType } from "./types";

export const getCmdOrCtrl: GetCmdOrCtrlType = () => {
  if (isDesktop) {
    if (isWindows) {
      return "Ctrl";
    }
    if (isMacOs) {
      return "⌘";
    }
  }
  return null;
};
