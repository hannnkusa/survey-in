import { sliderAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(sliderAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  track: {
    bg: "#BFE9EB",
  },
  filledTrack: {
    bg: "#00ADF0",
  },
  thumb: {
    bg: "#00ADF0",
  },
});

export const sliderTheme = defineMultiStyleConfig({ baseStyle });
