import pageNotFoundAnimation from "@/animations/pageNotFound.json";
import { Box, Stack, Text } from "@mantine/core";
import Lottie from "lottie-react";
import NextLink from "next/link";

const NotFound = () => (
  <Stack align="center" justify="center" mt="30px">
    <Box w="400px" h="400px">
      <Lottie animationData={pageNotFoundAnimation} loop={true} />
    </Box>
    <Text>
      Go to{" "}
      <NextLink
        href="/"
        style={{
          textDecoration: "none",
        }}
      >
        Home Page
      </NextLink>
    </Text>
  </Stack>
);

export default NotFound;
