import { Image } from "@chakra-ui/react";

const ImageLogo = () => {
  return (
    <Image
      src={
        "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
      }
      objectFit={"contain"}
    />
  );
};

export default ImageLogo;
