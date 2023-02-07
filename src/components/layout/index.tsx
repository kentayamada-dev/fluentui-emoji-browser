import { Box, Flex } from "@mantine/core";
import Head from "next/head";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import type { LayoutType } from "./types";

const HEADER_HEIGHT = "60px";

export const Layout: LayoutType = ({
  description,
  title,
  children,
  categoriesValue,
  queriesValue,
  colorValue,
  isLargerThanSM,
  onCategoriesChange,
  setQueries,
  onColorChange,
}) => (
  <>
    <Head>
      {/* google search console */}
      <meta
        name="google-site-verification"
        content="GrhtaVjtxOnHy7GOH6RyBrO7VSlWb3kr3Tf2v83TxmM"
      />
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="title" content={title} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://fluentui-emoji-browser.com/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://fluentui-emoji-browser.com/assets/meta.png"
      />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://fluentui-emoji-browser.com/"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content="https://fluentui-emoji-browser.com/assets/meta.png"
      />
    </Head>
    <Box pos="sticky" top="0" h={HEADER_HEIGHT} sx={{ zIndex: 999 }}>
      <Header
        categoriesValue={categoriesValue}
        onCategoriesChange={onCategoriesChange}
        setQueries={setQueries}
        queriesValue={queriesValue}
        colorValue={colorValue}
        onColorChange={onColorChange}
        isLargerThanSM={isLargerThanSM}
      />
    </Box>
    <Flex align="flex-start">
      {isLargerThanSM && (
        <Box w="250px" pos="sticky" top={HEADER_HEIGHT} p="3px">
          <Sidebar
            onCategoriesChange={onCategoriesChange}
            categoriesValue={categoriesValue}
            setQueries={setQueries}
            queriesValue={queriesValue}
            colorValue={colorValue}
            onColorChange={onColorChange}
            isLargerThanSM={isLargerThanSM}
          />
        </Box>
      )}
      <Box
        p="10px"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Flex>
  </>
);
