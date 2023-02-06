import { getCmdOrCtrl } from "@/lib/react-device-detect/getCmdOrCtrl";
import { Flex, Kbd, Box } from "@mantine/core";
import { useState, useEffect } from "react";
import type { KdbType } from "./types";

export const Kdb: KdbType = () => {
  const [cmdOrCtrl, setCmdOrCtrl] = useState<string | null>(null);

  useEffect(() => setCmdOrCtrl(getCmdOrCtrl()), []);

  if (!cmdOrCtrl) return <></>;

  return (
    <Flex align="center">
      <Kbd>{cmdOrCtrl}</Kbd>
      <Box mx="5px">+</Box>
      <Kbd>/</Kbd>
    </Flex>
  );
};
