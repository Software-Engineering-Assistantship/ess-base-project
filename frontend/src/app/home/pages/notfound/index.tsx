import { Box, Heading, Text, Button, Image, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { NavBar } from "../../../../shared/components/nav-bar";
import { BottomLeftTopRightImages } from "../../../../shared/components/spider-images";

const draculaUrl = "https://i.imgur.com/RP7qAvr.png";
const mavisUrl = "https://i.imgur.com/VvUqQfb.png";

const NotFoundPage = () => {
  return (
    <Box
      bg="#191919"
      color="#EAEAEA"
      minH="100vh"
      fontFamily="Inter"
      position="relative"
    >
      <NavBar />
      <BottomLeftTopRightImages />

      <Container centerContent mt={32} p={0} minH="500px" position="relative">
        <Image
          src={draculaUrl}
          alt="Drácula"
          position="absolute"
          bottom="0"
          left="-250px"
          width="auto"
          height="500px"
          display={{ base: "none", md: "block" }}
        />
        <Box textAlign="center" position="relative" zIndex="1">
          <Heading
            as="h1"
            fontSize="130px"
            fontWeight="400"
            mb={4}
            fontFamily={"Trancinfont"}
          >
            404
          </Heading>
          <Text fontSize="25px" fontFamily="Inter" fontWeight="200" mb={6}>
            Oops! Parece que você se perdeu no submundo.
          </Text>
          <Text fontSize="18px" mb={8}>
            A página que você está procurando não existe ou foi movida para
            outro castelo.
          </Text>
          <Button
            as={Link}
            to="/"
            //variant="outline"
            bg="#A4161A"
            colorScheme="red"
            height="60px"
            width="180px"
            fontSize="20px"
            fontWeight="400"
            fontFamily="Inter"
            borderColor="#EAEAEA"
            color="#EAEAEA"
            borderRadius="13px"
            px={12}
            //bg="transparent"
          >
            Voltar ao Início
          </Button>
        </Box>
        <Image
          src={mavisUrl}
          alt="Mavis"
          position="absolute"
          bottom="0"
          right="-200px"
          width="auto"
          height="500px"
          display={{ base: "none", md: "block" }}
        />
      </Container>
    </Box>
  );
};

export default NotFoundPage;
