import { Autocomplete, AutocompleteItem } from "@mantine/core";
import { useDebouncedValue, useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { DB } from "db";
import { useState, useRef, KeyboardEvent, useEffect } from "react";
import type { SearchFiledType } from "./types";
import { Kdb } from "./kbd";

export const SearchField: SearchFiledType = ({ setQueries, queriesValue }) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const keywords = Array.from(
    new Set(DB.map((emoji) => emoji.keywords).flat())
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== "Enter") return;
    setQueries(searchValue.trim().match(/[^\s]+/g) ?? []);
    event.currentTarget.blur();
  };

  const handleItemSubmit = (event: AutocompleteItem) => {
    setQueries(event.value.trim().match(/[^\s]+/g) ?? []);
  };

  const handleFilter = (_: string, item: AutocompleteItem): boolean =>
    debouncedSearchValue
      .trim()
      .match(/[^\s]+/g)
      ?.every(
        (searchValue) =>
          item.value.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ) ?? false;

  useEffect(() => {
    setSearchValue(queriesValue.join(" "));
  }, [queriesValue]);

  useHotkeys([["ctrl+/", () => autocompleteRef.current?.focus()]]);

  return (
    <Autocomplete
      onItemSubmit={handleItemSubmit}
      onKeyDown={handleKeyDown}
      transition="pop-top-left"
      transitionDuration={80}
      transitionTimingFunction="ease"
      limit={8}
      value={searchValue}
      onChange={setSearchValue}
      ref={autocompleteRef}
      placeholder="Search"
      icon={<IconSearch size={16} />}
      rightSectionWidth={90}
      rightSection={<Kdb />}
      styles={{ rightSection: { pointerEvents: "none" } }}
      filter={handleFilter}
      data={debouncedSearchValue.trim().length > 0 ? keywords : []}
    />
  );
};
