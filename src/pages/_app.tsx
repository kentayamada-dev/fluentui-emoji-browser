import { NextFontProvider } from "@/lib/next/fontProvider";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import type { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";

export const MyApp = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <QueryParamProvider
        adapter={NextAdapter}
        options={{
          removeDefaultsFromUrl: true,
        }}
      >
        <NextFontProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme, fontFamily: "inherit" }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </NextFontProvider>
      </QueryParamProvider>
    </>
  );
};

export default MyApp;
