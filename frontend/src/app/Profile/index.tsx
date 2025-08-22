
import React from "react";
import { Box, Image, Text, Container, Button } from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { BottomLeftTopRightImages } from "../../shared/components/spider-images";
import { Global } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../shared/components/nav-bar";
//import { Fonts } from "../../shared/theme/Fonts";

// URLs das imagens
const iconsUrls = [
  "https://i.imgur.com/TfiCssl.png",
  "https://imgur.com/zBt02Wg.png",
  "https://imgur.com/NzD9G2t.png",
  "https://imgur.com/yt1pmFB.png",
];

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleMyReservations= () => {
    navigate(`/my-reservations`)
  };

  return (
    <>
      <Global
        styles={`
          body {
            overflow: hidden;
          }
        `}
      />
      <Box
        bg="#191919"
        color="#EAEAEA"
        minH="100vh"
        fontFamily="Inter"
        position="relative"
      >
        <NavBar />
        <BottomLeftTopRightImages></BottomLeftTopRightImages>

        {/* Adicionando o título e os botões sobre a imagem */}
        <Box
          position="absolute"
          top="25%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text
            fontSize="60px"
            fontFamily="Trancinfont"
            letterSpacing={"-0.07em"}
            fontWeight="300"
            mb={3}
            textAlign="center"
            color="#EAEAEA"
          >
            Meu Perfil
          </Text>
        </Box>

        <Box
          position="absolute"
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Container mt={8} p={0} minH="500px" position="relative">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Link
                to="/client/profile/edit"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  bg="#784A95"
                  color="#EAEAEA"
                  _hover={{ bg: "#5e3a72" }}
                  borderRadius="11px"
                  mb={9}
                  w="300px"
                  h="50px"
                  justifyContent="space-between"
                  paddingRight="20px"
                  leftIcon={<Image src={iconsUrls[0]} boxSize="30px" />}
                >
                  <Box flex="1" textAlign="left">
                    Meus Dados
                  </Box>
                  <ChevronRightIcon />
                </Button>
              </Link>

              <Button
                data-cy="my-reservations-button"
                bg="#784A95"
                color="#EAEAEA"
                _hover={{ bg: "#5e3a72" }}
                borderRadius="11px"
                mb={9}
                w="300px"
                h="50px"
                justifyContent="space-between"
                paddingRight="20px"
                leftIcon={<Image src={iconsUrls[1]} boxSize="30px" />}
                onClick = {handleMyReservations}
              >
                <Box flex="1" textAlign="left">
                  Minhas Reservas
                </Box>
                <ChevronRightIcon />
              </Button>
              <Link
                to="/client/profile/whishlist"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  bg="#784A95"
                  color="#EAEAEA"
                  _hover={{ bg: "#5e3a72" }}
                  borderRadius="11px"
                  mb={9}
                  w="300px"
                  h="50px"
                  justifyContent="space-between"
                  paddingRight="20px"
                  leftIcon={<Image src={iconsUrls[2]} boxSize="30px" />}
                >
                  <Box flex="1" textAlign="left">
                    Lista de desejos
                  </Box>
                  <ChevronRightIcon />
                </Button>
              </Link>
              <Link
                to="/client/profile/rate"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  bg="#784A95"
                  color="#EAEAEA"
                  _hover={{ bg: "#5e3a72" }}
                  borderRadius="11px"
                  mb={9}
                  w="300px"
                  h="50px"
                  justifyContent="space-between"
                  paddingRight="20px"
                  leftIcon={<Image src={iconsUrls[3]} boxSize="30px" />}
                >
                  <Box flex="1" textAlign="left">
                    Avaliações
                  </Box>
                  <ChevronRightIcon />
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
