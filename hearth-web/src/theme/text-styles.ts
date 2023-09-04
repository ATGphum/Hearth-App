const textStyles = {
  // Headings will be removed once finished changing the whole text for the app
  heading: {
    h1: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.875rem", // 30px
      lineHeight: "2.375rem",
      print: {
        fontSize: "1.25rem",
        lineHeight: "1.5625rem",
      },
    },
    h2: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.75rem", // 28px
      lineHeight: "35px",
      print: {
        fontSize: "1.125rem",
        lineHeight: "1.4375rem",
      },
    },
    h3: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.5rem", // 24px
      lineHeight: "1.875rem",
      print: {
        fontSize: "0.9375rem",
        lineHeight: "1.25rem",
      },
    },
    h4: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.25rem", //20px
      lineHeight: "1.75rem",
      print: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
      },
    },
    h5: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.125rem", // 18px
      lineHeight: "1.4375rem",
      print: {
        fontSize: "0.75rem",
        lineHeight: "1.125rem",
      },
    },
    h6: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1rem", // 16px
      lineHeight: "1.75rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "1.125rem",
      },
    },
  },
  body: {
    extraSmall: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "0.625rem", // 10px
      lineHeight: "0.875rem",
      print: {
        fontSize: "0.438rem",
        lineHeight: "0.563rem",
      },
    },
    extraSmallBold: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "0.625rem", // 10px
      lineHeight: "0.875rem",
      print: {
        fontSize: "0.438rem",
        lineHeight: "0.563rem",
      },
    },
    small: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "0.75rem", // 12px
      lineHeight: "1rem",
      print: {
        fontSize: "0.625rem",
        lineHeight: "0.6875rem",
      },
    },
    smallBold: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "0.75rem",
      lineHeight: "1rem",
      print: {
        fontSize: "0.625rem",
        lineHeight: "0.75rem",
      },
    },
    smallBoldItalic: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: "0.75rem",
      lineHeight: "1rem",
      print: {
        fontSize: "0.625rem",
        lineHeight: "0.6875rem",
      },
    },
    medium: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "0.875rem", // 14px
      lineHeight: "1.3125rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.875rem",
      },
    },
    mediumBold: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "0.875rem",
      lineHeight: "1.3125rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.875rem",
      },
    },
    mediumItalic: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "italic",
      fontWeight: "normal",
      fontSize: "0.875rem",
      lineHeight: "1.3125rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.875rem",
      },
    },
    mediumLink: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "0.875rem",
      lineHeight: "1.3125rem",
      textDecorationLine: "none",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.875rem",
      },
    },
    large: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1rem", // 16px
      lineHeight: "1.375rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.9375rem",
      },
    },
    largeBold: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "1rem",
      lineHeight: "1.375rem",
      print: {
        fontSize: "0.6875rem",
        lineHeight: "0.9375rem",
      },
    },
    extraLarge: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1.125rem", // 18px
      lineHeight: "1.75rem",
      print: {
        fontSize: "0.75rem",
        lineHeight: "1rem",
      },
    },
    extraLargeBold: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "1.125rem", // 18px
      lineHeight: "1.75rem",
      print: {
        fontSize: "0.75rem",
        lineHeight: "1rem",
      },
    },
  },
  label: {
    medium: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "0.75rem",
      lineHeight: "1.3125rem",
      textTransform: "uppercase",
      print: {
        fontSize: "0.5rem",
        lineHeight: "0.6875rem",
      },
    },
  },
  variants: {
    errorMessage: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: "0.875rem",
      lineHeight: "1.3125rem",
      color: "accent.red",
      print: {
        fontSize: "0.563rem",
        lineHeight: "0.875rem",
      },
    },
  },
};

export default textStyles;
