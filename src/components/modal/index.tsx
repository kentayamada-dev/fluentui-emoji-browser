import type { ModalType } from "./types";
import {
  Box,
  Button,
  Center,
  ColorSwatch,
  Grid,
  Group,
  Menu,
  Modal as MantineModal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { getEmojiFilePath } from "@/utils/getEmojiFilePath";
import { COLOR } from "db";
import type { ColorType } from "db/types";
import { useCallback, useEffect, useState } from "react";
import { IconSitemap, IconPhoto } from "@tabler/icons";
import EmojiConvertor from "emoji-js";
import { TextCopyButton } from "../textCopyButton";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { ImagePreview } from "./imagePreview";
import { CloseButton } from "./closeButton";

const Modal: ModalType = ({
  emoji,
  folderName,
  isModalOpen,
  color,
  isLargerThanSM,
  handleModalClose,
}) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedSkinToneIndex, setSelectedSkinToneIndex] = useState(0);
  const emojiConvertor = new EmojiConvertor();
  emojiConvertor.replace_mode = "unified";
  const paddingSize = isLargerThanSM ? "0" : "20px";
  const paddingTopSize = isLargerThanSM ? "30px" : "20px";
  const theme = useMantineTheme();
  const [skinTone, setSkinTone] = useState<ColorType>("default");
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const isMulticolor = emoji?.isMulticolor ?? false;
  const isMulticolorNotDefault = isMulticolor && skinTone !== "default";
  const stringConcatIndex =
    emoji?.unicode.indexOf(" ") !== -1
      ? emoji?.unicode.indexOf(" ")
      : emoji?.unicode.length;
  const emojiValue = isMulticolorNotDefault
    ? emojiConvertor.replace_unified(
        emoji?.glyph + COLOR[skinTone]["unicodedCodepoint"]
      )
    : emoji?.glyph ?? "";
  const cldrNameValue = isMulticolorNotDefault
    ? emoji?.value + ": " + COLOR[skinTone]["skinTone"]
    : emoji?.value ?? "";
  const unicodeValue = isMulticolorNotDefault
    ? [
        emoji?.unicode.slice(0, stringConcatIndex),
        " " + COLOR[skinTone]["codepoint"],
        emoji?.unicode.slice(stringConcatIndex),
      ]
        .join("")
        .toUpperCase()
    : emoji?.unicode.toUpperCase() ?? "";

  const handleColorSwatch = (emojiColor: string) => {
    if (embla) {
      embla.scrollTo(Object.keys(COLOR).indexOf(emojiColor));
      setSkinTone(emojiColor as ColorType);
    }
  };

  const handleSelect = useCallback(() => {
    if (!embla) return;
    setSelectedSkinToneIndex(embla.selectedScrollSnap());
    setSkinTone(Object.keys(COLOR)[selectedSkinToneIndex] as ColorType);
  }, [embla, selectedSkinToneIndex]);

  const handleCloseButton = () => {
    handleModalClose();
    setSkinTone(color);
  };

  const handleCopyFn = async (copyFn: () => Promise<void>) => {
    await copyFn();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const copySvgToClipboard = async () => {
    const res = await fetch(
      `${getEmojiFilePath({
        isMulticolor: isMulticolorNotDefault,
        folderName,
        color: skinTone,
      })}.svg`
    );
    const text = await res.text();
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const copyImgToClipboard = async () => {
    const res = await fetch(
      `${getEmojiFilePath({
        isMulticolor: isMulticolorNotDefault,
        folderName,
        color: skinTone,
      })}.png`
    );
    const blob = await res.blob();
    const item = new ClipboardItem({
      "image/png": blob,
    });
    await navigator.clipboard.write([item]);
  };

  useAnimationOffsetEffect(embla, 200);

  useEffect(() => {
    if (!embla) return;
    handleSelect();
    embla.on("select", handleSelect);
  }, [embla, handleSelect]);

  useEffect(() => {
    setSkinTone(color);
  }, [color]);

  return (
    <MantineModal
      size="auto"
      withCloseButton={false}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      padding={0}
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
      sx={{ zIndex: 9999 }}
      opened={isModalOpen}
      onClose={handleCloseButton}
    >
      <Grid
        w={isLargerThanSM ? "700px" : "300px"}
        h={isLargerThanSM ? "400px" : "500px"}
      >
        <Grid.Col sm={6} pos="relative">
          {!isLargerThanSM && <CloseButton closeHandler={handleCloseButton} />}
          <Box
            h="100%"
            sx={({ colors, colorScheme }) => ({
              backgroundColor:
                colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
            })}
          >
            {isMulticolor ? (
              <>
                <Carousel
                  initialSlide={Object.keys(COLOR).indexOf(color)}
                  getEmblaApi={setEmbla}
                  loop
                  h="80%"
                  pb="15px"
                >
                  {Object.keys(COLOR).map((color) => (
                    <Carousel.Slide key={color}>
                      <ImagePreview
                        alt={cldrNameValue}
                        color={color}
                        folderName={folderName}
                        isLargerThanSM={isLargerThanSM}
                        isMulticolor={isMulticolorNotDefault}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
                <Group h="20%" position="center">
                  {Object.keys(COLOR).map((emojiColor) => (
                    <Group position="center" spacing="xs" key={emojiColor}>
                      <ColorSwatch
                        size={20}
                        component="button"
                        color={`#${COLOR[emojiColor as ColorType]["hex"]}`}
                        onClick={() => handleColorSwatch(emojiColor)}
                        styles={(theme) => ({
                          root: {
                            cursor: "pointer",
                            ...(Object.keys(COLOR)[selectedSkinToneIndex] ===
                              emojiColor && {
                              border: `3px solid ${
                                theme.colors.blue[theme.fn.primaryShade()]
                              }`,
                            }),
                          },
                        })}
                      />
                    </Group>
                  ))}
                </Group>
              </>
            ) : (
              <ImagePreview
                alt={cldrNameValue}
                color={color}
                folderName={folderName}
                isLargerThanSM={isLargerThanSM}
                isMulticolor={isMulticolorNotDefault}
              />
            )}
          </Box>
        </Grid.Col>
        <Grid.Col sm={6} pos="relative">
          {isLargerThanSM && <CloseButton closeHandler={handleCloseButton} />}
          <Center h="100%" px={paddingSize} pb={paddingSize}>
            <Grid gutter="xs" w="300px">
              <Grid.Col
                span={5}
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Text fw={700}>Browser</Text>
              </Grid.Col>
              <Grid.Col span={7}>
                <TextCopyButton fontSize="30px" value={emojiValue} />
              </Grid.Col>
              <Grid.Col span={5}>
                <Text fw={700}>CLDR Name</Text>
              </Grid.Col>
              <Grid.Col span={7} style={{ minHeight: "60px" }}>
                <TextCopyButton value={cldrNameValue} />
              </Grid.Col>
              <Grid.Col span={5}>
                <Text fw={700}>Unicode</Text>
              </Grid.Col>
              <Grid.Col span={7} style={{ minHeight: "60px" }}>
                <TextCopyButton value={unicodeValue} />
              </Grid.Col>
              <Grid.Col span={5} pt={paddingTopSize} p={0} pr={5}>
                <Menu openDelay={100} closeDelay={400}>
                  <Menu.Target>
                    <Button w="100%" color={isCopied ? "teal" : "blue"}>
                      {isCopied ? "Copied!" : "Copy"}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      component="a"
                      icon={<IconPhoto size={14} />}
                      onClick={async () =>
                        await handleCopyFn(copyImgToClipboard)
                      }
                    >
                      PNG
                    </Menu.Item>
                    <Menu.Item
                      component="a"
                      icon={<IconSitemap size={14} />}
                      onClick={async () =>
                        await handleCopyFn(copySvgToClipboard)
                      }
                    >
                      SVG
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Grid.Col>
              <Grid.Col span={7} pt={paddingTopSize} p={0} pl={5}>
                <Menu openDelay={100} closeDelay={400}>
                  <Menu.Target>
                    <Button w="100%" color={isDownloading ? "teal" : "blue"}>
                      {isDownloading ? "Downloading..." : "Download"}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconPhoto size={14} />}
                      download={`${folderName}-${skinTone}.png`}
                      component="a"
                      href={`${getEmojiFilePath({
                        isMulticolor: isMulticolorNotDefault,
                        folderName,
                        color: skinTone,
                      })}.png`}
                      onClick={handleDownload}
                    >
                      PNG
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconSitemap size={14} />}
                      download={`${folderName}-${skinTone}.svg`}
                      component="a"
                      href={`${getEmojiFilePath({
                        isMulticolor: isMulticolorNotDefault,
                        folderName,
                        color: skinTone,
                      })}.svg`}
                      onClick={handleDownload}
                    >
                      SVG
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Grid.Col>
            </Grid>
          </Center>
        </Grid.Col>
      </Grid>
    </MantineModal>
  );
};

export default Modal;
