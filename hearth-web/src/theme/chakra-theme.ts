// https://chakra-ui.com/docs/features/color-mode#updating-the-theme-configimport

import { extendBaseTheme } from "@chakra-ui/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import colors from "./colors";
import textStyles from "./text-styles";

import { sliderTheme as Slider } from "@chakra-ui/theme/components/slider";

const theme = {
  fonts: { heading: `Jost, "Inter"`, body: `Jost, "Inter"` },
  textStyles: textStyles,
  colors: colors,
  components: { Slider },
  config: {
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "input:focus, textarea:focus, select:focus, button:focus": {
        boxShadow: "none",
        outline: "none",
      },
    },
  },
};

export default extendBaseTheme(theme);
