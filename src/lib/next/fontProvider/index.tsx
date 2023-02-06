import type { NextFontProviderType } from "./types";
import { Roboto } from "@next/font/google";

const MoonDance = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const NextFontProvider: NextFontProviderType = ({ children }) => (
  <>
    <style jsx global>{`
      body {
        font-family: ${MoonDance.style.fontFamily} !important;
      }
    `}</style>
    {children}
  </>
);
