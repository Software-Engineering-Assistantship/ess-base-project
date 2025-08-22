import { Image } from "@chakra-ui/react";
import Net from "../../../shared/assets/net.png";

export const JustNet: React.FC = () => {
    return (      
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
    );
  };