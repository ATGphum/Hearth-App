// https://chakra-ui.com/docs/features/color-mode#updating-the-theme-configimport

import { extendTheme } from "@chakra-ui/react";
// import "@fontsource/open-sans";
// import "@fontsource/oxygen";
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
  fonts: { heading: `Oxygen, "Open Sans"`, body: `Oxygen, "Open Sans"` },
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
