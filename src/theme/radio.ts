import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "12px", // change the border radius
    borderColor: "#00ADF0", // change the border color

    _focus: {
      _hover: {
        background: "white",
      },
    },

    _checked: {
      borderColor: "#00ADF0",
      background: "none",
      _before: {
        bg: "#00ADF0",
        w: "75%",
        h: "75%",
      },
    },
  },
  _before: {
    background: "#121211",
  },
});

export const radioTheme = defineMultiStyleConfig({ baseStyle });
