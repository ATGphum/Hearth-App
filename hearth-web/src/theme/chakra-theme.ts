// https://chakra-ui.com/docs/features/color-mode#updating-the-theme-configimport

import { extendBaseTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/inter/300.css";
import "@fontsource/inter/500.css";
import "@fontsource/jost";
import "@fontsource/lato/700.css";
import colors from "./colors";
import textStyles from "./text-styles";

/**
 * This theme config allows you to add variables for use in Chakra components
 * To begin with I've added the themed color values Joe has setup in figma
 */

const theme = {
  fonts: { heading: `Jost, "Inter"`, body: `Jost, "Inter"` },
  textStyles: textStyles,
  colors: colors,

  config: {
    useSystemColorMode: false,
  },
};

export default extendBaseTheme(theme);
