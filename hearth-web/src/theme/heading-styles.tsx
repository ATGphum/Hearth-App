import { As, Heading } from "@chakra-ui/react";
import textStyles from "./text-styles";

interface Props {
  typeOfHeader: string;
  children?: React.ReactNode;
  bold?: boolean;
  color?: string;
  marginBottom?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
  margin?: string;
  padding?: string;
  paddingBottom?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingLeft?: string;
  isTextCenter?: boolean;
  width?: string;
  height?: string;
  isTextCapitalise?: boolean;
  isPointer?: boolean;
  isVisible?: boolean;
}

/**
 * Sets the header with the right formatting.
 *
 * Custom made for Matae.
 */
export const Headers: React.FC<Props> = ({
  typeOfHeader,
  children,
  bold,
  color,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  isTextCenter,
  width,
  height,
  isTextCapitalise = true,
  isPointer,
  isVisible = true,
}) => {
  /**
   * Get the respective values for modifying the text properties of the header.
   *
   * @returns Text properties
   */
  const getValues = () => {
    switch (typeOfHeader) {
      case "h2":
        return textStyles.heading.h2;

      case "h3":
        return textStyles.heading.h3;

      case "h4":
        return textStyles.heading.h4;

      case "h5":
        return textStyles.heading.h5;

      case "h6":
        return textStyles.heading.h6;

      default:
        return textStyles.heading.h1;
    }
  };

  return (
    <>
      <Heading
        as={typeOfHeader as As<any> | undefined}
        fontFamily={getValues().fontFamily}
        fontSize={getValues().fontSize}
        fontWeight={bold ? "bold" : getValues().fontWeight}
        fontStyle={getValues().fontStyle}
        lineHeight={getValues().lineHeight}
        textTransform={isTextCapitalise ? "capitalize" : undefined}
        margin={margin ? margin : "0"}
        marginRight={marginRight ? marginRight : "0"}
        marginLeft={marginLeft ? marginLeft : "0"}
        marginBottom={marginBottom ? marginBottom : "0"}
        marginTop={marginTop ? marginTop : "0"}
        padding={padding ? padding : "0"}
        paddingRight={paddingRight ? paddingRight : "0"}
        paddingLeft={paddingLeft ? paddingLeft : "0"}
        paddingTop={paddingTop ? paddingTop : "0"}
        paddingBottom={paddingBottom ? paddingBottom : "0"}
        sx={{
          "@media print": {
            textStyle: "heading." + typeOfHeader + ".print",
            mb: "4px",
          },
        }}
        color={color}
        textAlign={isTextCenter ? "center" : undefined}
        width={width}
        height={height}
        cursor={isPointer ? "pointer" : "inherit"}
        visibility={isVisible ? "visible" : "hidden"}
      >
        {children}
      </Heading>
    </>
  );
};
