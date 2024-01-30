/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { radioTheme } from "./radio";

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        bg: "#0046AF",
      },
    },
    Radio: radioTheme,
  },
  colors: {
    main: {
      grey1: "#e5eff2",
      grey2: "#193742",
      grey3: "#1e1e1e",
      blue1: "#a5fecb",
      blue2: "#00adf0",
      blue3: "#20BDFF",
      blue4: "#0046af",
    },
  },
  fonts: {
    heading: "var(--font-work-sans)",
    body: "var(--font-work-sans)",
  },
});
export default theme;
