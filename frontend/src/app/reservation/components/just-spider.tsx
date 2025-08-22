import {Image} from "@chakra-ui/react";
import Spider from "../../../shared/assets/spider.png";
export const JustSpider: React.FC = () => {
    return (      
      <Image
      src={Spider}
      alt="Top Right"
      position="absolute"
      top="0px" // Adjust this value to be below the navbar
      right="0"
      zIndex="0"
      display={{ base: "none", md: "block" }} // Hide on mobile, show on desktop
      transform="scale(0.8)" // Scale down to half size
      transformOrigin="top right" // Scale from the top right corner
    /> 
);
};
