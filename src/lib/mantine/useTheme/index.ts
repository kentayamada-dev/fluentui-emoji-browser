import { useMantineColorScheme } from "@mantine/core";
import type { UseThemeType } from "./types";

export const useTheme: UseThemeType = (lightValue, darkValue) => {
  const { colorScheme } = useMantineColorScheme();

  return colorScheme === "dark" ? darkValue : lightValue;
};
