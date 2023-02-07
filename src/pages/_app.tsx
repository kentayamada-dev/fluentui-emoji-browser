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
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/ga/constants";

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
      <Script
        id="load-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="load-ga-script">
        {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${GA_TRACKING_ID}');
          `}
      </Script>
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
