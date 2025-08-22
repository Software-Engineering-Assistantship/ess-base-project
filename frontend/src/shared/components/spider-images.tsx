
import { Image } from "@chakra-ui/react";
import Net from "../assets/net.png";
import Spider from "../assets/spider.png";

export const BottomLeftTopRightImages: React.FC = () => {
  return (
    <>
      <Image
        src={Net}
        alt="Bottom Left"
        position="absolute"
        bottom="0"
        left="0"
        zIndex="0"
        display={{ base: "none", md: "block" }} // Hide on mobile, show on desktop
        transform="scale(0.75)" // Scale down to half size
        transformOrigin="bottom left" // Scale from the bottom left corner
      />
      <Image
        src={Spider}
        alt="Top Right"
        position="absolute"
        top="80px" // Adjust this value to be below the navbar
        right="0"
        zIndex="0"
        display={{ base: "none", md: "block" }} // Hide on mobile, show on desktop
        transform="scale(0.8)" // Scale down to half size
        transformOrigin="top right" // Scale from the top right corner
      />
    </>
  );
};

