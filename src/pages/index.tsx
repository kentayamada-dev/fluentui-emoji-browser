import { Layout } from "@/components/layout";
import { Grids } from "@/components/grids";
import {
  useQueryParam,
  withDefault,
  DelimitedArrayParam,
} from "use-query-params";
import { removeNullFromArray } from "@/utils/removeNullFromArray";
import { useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { CategoryArrayParam, ColorParam } from "@/lib/use-query-params";
import dynamic from "next/dynamic";
import { DB } from "db";

const DynamicModal = dynamic(() => import("@/components/modal"), {
  ssr: false,
});

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emojiFolderName, setEmojiFolderName] = useState("");
  const emoji = DB.find((emoji) => emoji["folderName"] === emojiFolderName);
  const {
    breakpoints: { sm },
  } = useMantineTheme();
  const isLargerThanSM = useMediaQuery(`(min-width: ${sm}px)`, true, {
    getInitialValueInEffect: false,
  });
  const title =
    isModalOpen && emoji
      ? `${emoji.glyph} - ${emoji.value} - ${emoji.unicode.toUpperCase()}`
      : "Fluent Emoji Browser";

  const description =
    isModalOpen && emoji
      ? `${emoji.glyph} - ${emoji.value} - ${emoji.unicode.toUpperCase()}`
      : "The fluent emoji search engine. Filtering by name, category, and skin tone is available to find the desired emoji in the fastest possible time.";

  const handleClickEmoji = (emojiName: string) => {
    setEmojiFolderName(emojiName);
    setIsModalOpen(true);
  };

  const [categories, setCategories] = useQueryParam(
    "category",
    withDefault(CategoryArrayParam, [])
  );

  const [queries, setQueries] = useQueryParam(
    "query",
    withDefault(DelimitedArrayParam, [])
  );

  const [skinColor, setSkinColor] = useQueryParam(
    "skin",
    withDefault(ColorParam, "default")
  );

  const nullRemovedCategories = removeNullFromArray(categories);
  const nullRemovedQueries = removeNullFromArray(queries);

  return (
    <>
      <DynamicModal
        emoji={emoji}
        folderName={emojiFolderName}
        handleModalClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        isLargerThanSM={isLargerThanSM}
        color={skinColor}
      />
      <Layout
        description={description}
        isLargerThanSM={isLargerThanSM}
        title={title}
        categoriesValue={nullRemovedCategories}
        onCategoriesChange={setCategories}
        setQueries={setQueries}
        queriesValue={nullRemovedQueries}
        onColorChange={setSkinColor}
        colorValue={skinColor}
      >
        <Grids
          categoriesValue={nullRemovedCategories}
          queriesValue={nullRemovedQueries}
          colorValue={skinColor}
          handleClickEmoji={handleClickEmoji}
        />
      </Layout>
    </>
  );
};

export default Home;
