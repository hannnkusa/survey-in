import { Box, Spinner } from "@chakra-ui/react";

export default function LoaderOverlay({ isLoading }: { isLoading: boolean }) {
  if (isLoading)
    return (
      <Box position="absolute" top="50%" left="50%" backdropBrightness={80}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
}
