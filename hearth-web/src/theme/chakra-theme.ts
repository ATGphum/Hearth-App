// https://chakra-ui.com/docs/features/color-mode#updating-the-theme-configimport

import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/300.css";
import "@fontsource/lato/700.css";
import "@fontsource/jost";
import colors from "./colors";
import button from "./components/button";
import link from "./components/link";
import List from "./components/List";
import popover from "./components/popover";
import tabs from "./components/tabs";
import drawer from "./components/drawer";
import textStyles from "./text-styles";
import tag from "./components/tag";
import checkbox from "./components/checkbox";
import switches from "./components/switch";
import tooltip from "./components/tooltip";

/**
 * This theme config allows you to add variables for use in Chakra components
 * To begin with I've added the themed color values Joe has setup in figma
 */

const theme = {
  fonts: { heading: `Jost, "Inter"`, body: `Jost, "Inter"` },
  textStyles: textStyles,
  colors: colors,
  components: {
    Button: button,
    Link: link,
    List: List,
    Tabs: tabs,
    Popover: popover,
    Tooltip: tooltip,
    Drawer: drawer,
    Tag: tag,
    Checkbox: checkbox,
    Switch: switches,
  },
  config: {
    useSystemColorMode: false,
  },
};

export default extendTheme(theme);
