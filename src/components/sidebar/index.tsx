import {
  Accordion,
  Box,
  Button,
  Chip,
  ColorSwatch,
  Group,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { COLOR, GROUP } from "db";
import type { ColorType } from "db/types";
import { SearchField } from "../header/searchField";
import type { SidebarType } from "./types";

export const Sidebar: SidebarType = ({
  onCategoriesChange,
  setQueries,
  onColorChange,
  categoriesValue,
  queriesValue,
  colorValue,
  isLargerThanSM,
}) => (
  <>
    {!isLargerThanSM && (
      <Box px="10px" pt="30px" pb="10px">
        <SearchField setQueries={setQueries} queriesValue={queriesValue} />
      </Box>
    )}
    <Accordion
      // @ts-ignore
      defaultValue={["category", "skin"]}
      styles={{
        content: {
          padding: "10px",
        },
        label: {
          padding: "10px",
        },
        control: {
          padding: 0,
        },
      }}
    >
      <Accordion.Item value="category">
        <Accordion.Control>Category</Accordion.Control>
        <Accordion.Panel>
          <Chip.Group
            value={categoriesValue}
            onChange={onCategoriesChange}
            multiple
          >
            {GROUP.map((category) => (
              <Chip
                value={category}
                key={category}
                styles={{
                  label: {
                    fontSize: "11px",
                  },
                }}
              >
                {category}
              </Chip>
            ))}
          </Chip.Group>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="skin">
        <Accordion.Control>Skin Tone</Accordion.Control>
        <Accordion.Panel>
          <Group>
            {Object.keys(COLOR).map((color) => (
              <Group position="center" spacing="xs" key={color}>
                <ColorSwatch
                  size={24}
                  component="button"
                  color={`#${COLOR[color as ColorType]["hex"]}`}
                  onClick={() => onColorChange(color)}
                  styles={(theme) => ({
                    root: {
                      cursor: "pointer",
                      ...(colorValue === color && {
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
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
    <Box w="100%" px="5px" pt="20px">
      <Button
        w="100%"
        href="https://github.com/kentayamada-dev/fluentui-emoji-browser"
        target="_blank"
        component="a"
        variant="default"
        leftIcon={<IconBrandGithub size={25} />}
      >
        Source Code
      </Button>
    </Box>
  </>
);
