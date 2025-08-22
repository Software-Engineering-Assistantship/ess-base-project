import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import { useRef } from "react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { SearchBar } from "../../components/search-bar";
import { AnimatedTooltipPreview } from "../../components/animated-tooltip-preview";
import Card from "../../components/ui/card";
import { FlipWordsTitle } from "../../components/flip-words-title";

// URLs das imagens dos cards
const iconsUrls = [
  "https://i.imgur.com/FMcfc42.png",
  "https://i.imgur.com/6Bo0jpq.png",
  "https://i.imgur.com/ikLfv60.png",
  "https://i.imgur.com/NXxtrYx.png",
];
const logoUrl = "https://i.imgur.com/Ag82NHs.png";
const draculaUrl = "https://i.imgur.com/RP7qAvr.png";
const mavisUrl = "https://i.imgur.com/VvUqQfb.png";

export const HomePage = () => {
  const secondHalfRef = useRef<HTMLDivElement>(null);

  const scrollToSecondHalf = () => {
    if (secondHalfRef.current) {
      secondHalfRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      bg="#191919"
      color="#EAEAEA"
      minH="100vh"
      fontFamily="Inter"
      position="relative"
    >
      <NavBar />

      <Container centerContent mt={32} p={0} minH="500px" position="relative">
        <Image
          src={draculaUrl}
          alt="Drácula"
          position="absolute"
          bottom="0"
          left="-360px" // Ajuste conforme necessário
          width="auto"
          height="500px"
          display={{ base: "none", md: "block" }}
        />
        <Box textAlign="center" position="relative" zIndex="1">
          <Text fontSize="25px" fontFamily="Inter" fontWeight="200" mb={-6}>
            O melhor gerenciador de hotéis do submundo.
          </Text>
          <FlipWordsTitle />
          <Box mt={6} mb={1}>
            <SearchBar />
          </Box>
          <Button
            variant="outline"
            height="70px"
            width="220px"
            fontSize="25px"
            fontWeight="200"
            fontFamily="Inter"
            borderColor="#EAEAEA"
            color="#EAEAEA"
            _hover={{
              bg: "transparent",
              color: "#FAC006",
              borderColor: "#FAC006",
            }}
            borderRadius="13px"
            px={12}
            bg="transparent"
            mt={3}
            onClick={scrollToSecondHalf} // Adicionando evento de clique
          >
            Saiba mais
          </Button>
        </Box>
        <Image
          src={mavisUrl}
          alt="Mavis"
          position="absolute"
          bottom="0"
          right="-300px" // Ajuste conforme necessário
          width="auto"
          height="500px"
          display={{ base: "none", md: "block" }}
        />
      </Container>

      <Box
        mt={30}
        ref={secondHalfRef}
        bg="#191919"
        color="#EAEAEA"
        p={8}
        fontFamily="Inter"
      >
        <Flex
          justify="center"
          align="center"
          gap="50px"
          wrap="wrap"
          mb={12}
          mt={24}
        >
          <Card
            imageUrl={iconsUrls[0]}
            title="Cadastre-se"
            description="Comece a planejar sua estadia hoje mesmo."
            imageSize={{ width: "172.7px", height: "120px" }}
            link="/client/register"
          />
          <Card
            imageUrl={iconsUrls[1]}
            title="Faça já sua reserva!"
            description="Descubra ofertas surpreenDENTES."
            imageSize={{ width: "144.5px", height: "133.9px" }}
            link="/reservations"
          />
          <Card
            imageUrl={iconsUrls[2]}
            title="Anuncie sua propriedade"
            description="Atraia humanos e monstros."
            imageSize={{ width: "136.2px", height: "128.9px" }}
            link="/hotelier/register"
          />
          <Card
            imageUrl={iconsUrls[3]}
            title="Pague com BloodCard"
            description="Cadastre seus melhores cartões aqui."
            imageSize={{ width: "88.6px", height: "128.9px" }}
            link="/payment"
          />
        </Flex>
        <Box textAlign="center" mb={100} mt={151}>
          <Heading size="md" mb={31.7} fontFamily="Inter" fontWeight="200">
            NOSSO TIME DE DESENVOLVIMENTO
          </Heading>
          <Flex justify="center" align="center" wrap="wrap" gap="20px">
            <Box display="flex" alignItems="center">
              <AnimatedTooltipPreview />
              <Box width="2px" height="80px" bg="#EAEAEA" mx={4} />
              <Image
                src={logoUrl}
                alt="CIn UFPE Logo"
                width="291.8px"
                height="auto"
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
