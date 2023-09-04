// needed to allow clicking outside the drawer
// see https://github.com/chakra-ui/chakra-ui/issues/2893#issuecomment-780143150
const drawer = {
  variants: {
    alwaysOpen: {
      dialog: {
        pointerEvents: "auto",
      },
      dialogContainer: {
        pointerEvents: "none",
      },
    },
  },
};

export default drawer;
