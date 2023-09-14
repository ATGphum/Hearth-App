// https://chakra-ui.com/docs/features/color-mode#updating-the-theme-configimport

import { extendBaseTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/jost";
import colors from "./colors";
import textStyles from "./text-styles";

// import chakraTheme from "@chakra-ui/theme";
// const { Slider } = chakraTheme.components;

const theme = {
  fonts: { heading: `Jost, "Inter"`, body: `Jost, "Inter"` },
  textStyles: textStyles,
  colors: colors,
  components: {
    // Slider,
  },
  config: {
    useSystemColorMode: false,
  },
};

export default extendBaseTheme(theme);
