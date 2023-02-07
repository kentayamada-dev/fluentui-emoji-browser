import {
  Affix,
  Box,
  Button,
  Center,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";
import { wait } from "@/utils/wait";
import { DB } from "db";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";
import { MemorizedGrid } from "./grid";
import type { GridsType } from "./types";
import type { ColorType } from "db/types";
import Lottie from "lottie-react";
import emojiNotFoundAnimation from "@/animations/emojiNotFound.json";

export const Grids: GridsType = ({
  categoriesValue,
  queriesValue,
  colorValue,
  handleClickEmoji,
}) => {
  const [scroll, scrollTo] = useWindowScroll();
  const [count, setCount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const itemFiltered = DB.filter(
    (emoji) =>
      (categoriesValue.length
        ? categoriesValue.includes(emoji["group"])
        : true) &&
      (queriesValue.length
        ? queriesValue.every(
            (searchValue) =>
              emoji["keywords"]
                .join("")
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) !== -1
          )
        : true)
  );
  const itemSum = itemFiltered.length;
  const itemList = itemFiltered.slice(0, count);
  const errorMessage = `Sorry, we couldn't find any matches for '${queriesValue.join(
    " "
  )}'`;

  const handleLoadMore = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await wait(2);
      setCount((prevCount) => prevCount + 100);
      setIsLoading(false);
    }
  };

  return (
    <>
      <InfiniteScroll
        threshold={100}
        loadMore={handleLoadMore}
        hasMore={itemSum !== itemList.length}
        loader={
          <Center py="30px" key={0}>
            <Loader variant="dots" size="xl" />
          </Center>
        }
      >
        {itemList.length ? (
          <SimpleGrid cols={5} breakpoints={[{ minWidth: "md", cols: 8 }]}>
            {itemList.map(({ value, folderName, isMulticolor }) => (
              <Center w="100%" key={value}>
                <MemorizedGrid
                  folderName={folderName}
                  value={value}
                  color={colorValue as ColorType}
                  isMulticolor={isMulticolor}
                  handleClickEmoji={handleClickEmoji}
                />
              </Center>
            ))}
          </SimpleGrid>
        ) : (
          <Stack align="center">
            <Box w="300px" h="300px">
              <Lottie animationData={emojiNotFoundAnimation} loop={true} />
            </Box>
            <Text fw={700} fz="xl" ta="center">
              {errorMessage}
            </Text>
          </Stack>
        )}
      </InfiniteScroll>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};
