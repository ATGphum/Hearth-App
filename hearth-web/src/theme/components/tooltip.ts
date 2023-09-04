import { cssVar } from "@chakra-ui/react";

// coloring the tooltip arrow: https://github.com/chakra-ui/chakra-ui/issues/4695
const arrowBg = cssVar("popper-arrow-bg");

const tooltip = {
  baseStyle: {
    fontFamily: `"Oxygen", "Open Sans"`,
    fontStyle: "normal",
    fontSize: "0.75rem",
    color: "grey.g02",
    bg: "neutral.white",
    [arrowBg.variable]: "colors.neutral.white",
    borderRadius: "0.25rem",
  },
  variants: {
    dark: {
      bg: "Matae.brand.200",
      color: "neutral.white",
    },
  },
};
export default tooltip;
