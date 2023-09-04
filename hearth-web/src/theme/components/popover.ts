const popover = {
  parts: ["content", "body", "header"],
  baseStyle: {
    content: {
      _focus: {
        boxShadow: "none",
      },
    },
    body: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontSize: "0.75rem",
      color: "grey.g03",
    },
    header: {
      fontFamily: `"Oxygen", "Open Sans"`,
      fontStyle: "normal",
      fontSize: "0.875rem",
      color: "grey.g03",
    },
  },
};

export default popover;
