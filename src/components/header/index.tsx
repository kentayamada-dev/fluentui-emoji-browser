import {
  Header as MantineHeader,
  Flex,
  ActionIcon,
  useMantineColorScheme,
  Group,
  Box,
  Tooltip,
  Drawer,
  useMantineTheme,
  Burger,
} from "@mantine/core";
import NextImage from "next/image";
import { IconSun, IconMoon } from "@tabler/icons";
import type { HeaderType } from "./types";
import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { useTheme } from "@/lib/mantine/useTheme";
import { SearchField } from "./searchField";

const COMMON_HEIGHT = "36px";

export const Header: HeaderType = ({
  onCategoriesChange,
  setQueries,
  onColorChange,
  queriesValue,
  categoriesValue,
  colorValue,
  isLargerThanSM,
}) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const {
    colors: { dark, gray },
  } = useMantineTheme();
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  useEffect(() => {
    if (isLargerThanSM) {
      setIsBurgerOpened(false);
    }
  }, [isLargerThanSM]);

  return (
    <>
      <MantineHeader height="100%" p="10px">
        <Flex justify="space-between" align="center" h="100%">
          <Flex>
            {!isLargerThanSM && (
              <Burger
                mr="15px"
                opened={isBurgerOpened}
                onClick={() => setIsBurgerOpened((state) => !state)}
              />
            )}
            <Box pos="relative" w="250px" h={COMMON_HEIGHT}>
              <NextImage
                alt="Fluent Emoji Browser"
                src="/logo.svg"
                fill
                sizes="300px"
                priority
                quality={100}
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </Flex>
          <Group>
            {isLargerThanSM && (
              <SearchField
                setQueries={setQueries}
                queriesValue={queriesValue}
              />
            )}
            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
            <Tooltip label={`${useTheme("Dark", "Light")} Mode`}>
              <ActionIcon
                variant="default"
                miw={COMMON_HEIGHT}
                mih={COMMON_HEIGHT}
                onClick={() => toggleColorScheme()}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.yellow[4]
                      : theme.colors.indigo[9],
                })}
              >
                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                {useTheme(<IconMoon size={25} />, <IconSun size={25} />)}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Flex>
      </MantineHeader>
      <Drawer
        overlayColor={useTheme(gray[2], dark[9])}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={isBurgerOpened}
        onClose={() => setIsBurgerOpened(false)}
      >
        <Sidebar
          colorValue={colorValue}
          onColorChange={onColorChange}
          categoriesValue={categoriesValue}
          onCategoriesChange={onCategoriesChange}
          setQueries={setQueries}
          queriesValue={queriesValue}
          isLargerThanSM={isLargerThanSM}
        />
      </Drawer>
    </>
  );
};
