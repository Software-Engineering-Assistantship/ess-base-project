import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { FlipWords } from "./ui/flip-words-effect";

export function FlipWordsTitle() {
  const words = ["humanos", "FANTASMAS", "vampiros", "ZUMBIS"];
  const textColor = useColorModeValue("gray.100", "white");

  return (
    <Box
      h="10rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      fontFamily="Trancinfont"
      px={4}
    >
      <Heading
        fontSize="109px"
        mb={8}
        color={textColor}
        fontFamily="Trancinfont"
        display="inline-block"
        alignItems="start"
        textAlign={"left"}
        fontWeight={400}
        letterSpacing={"-0.07em"}
      >
        HOTÉIS PArA{" "}
        <Box
          as="span"
          ml="8px"
          position="relative"
          display="inline-block"
          fontFamily="Trancinfont"
        >
          <FlipWords words={words} />
        </Box>
      </Heading>
    </Box>
  );
}
