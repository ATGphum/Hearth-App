const button = {
  baseStyle: {
    fontStyle: "normal",
    fontWeight: "bold",
    _focus: {
      boxShadow: "none",
    },
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    s: {
      height: "2rem",
      fontSize: "0.75rem",
      lineHeight: "1.375rem",
      px: "1rem",
      py: "0.313rem",
      textAlign: "center",
      borderRadius: "0.25rem",
    },
    sLink: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      textAlign: "center",
      borderRadius: "0.25rem",
      fontStyle: "normal",
      fontWeight: "normal",
    },
    m: {
      height: "2.5rem",
      fontSize: "0.75rem",
      lineHeight: "1.375rem",
      px: "1rem",
      py: "0.313rem",
      textAlign: "center",
      borderRadius: "0.25rem",
    },
  },
  variants: {
    dark: {
      bg: "brand.primary",
      color: "neutral.white",
    },
    red: {
      bg: "accent.red",
      color: "neutral.white",
    },
    matae: {
      bg: "#6264A7",
      color: "neutral.white",
      border: "1px",
    },
    light: {
      bg: "neutral.white",
      color: "neutral.black",
      borderColor: "neutral.black",
      border: "1px",
    },
    transparent: {
      bg: "None",
      color: "neutral.black",
      borderColor: "neutral.black",
      border: "1px",
    },
    link: {
      bg: "None",
      color: "color.blue",
      borderColor: "None",
    },
    icon: {
      background: "None",
      variant: "unstyled",
    },
  },
};
export default button;
