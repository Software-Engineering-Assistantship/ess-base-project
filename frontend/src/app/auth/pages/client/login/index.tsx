import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { LoginFormInputs, LoginSchema } from "../../../forms/login-form";
import { useLoginClientMutation } from "../../../hooks";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const moonImage = "https://i.imgur.com/QxLtz78.png";
const barImage = "https://i.imgur.com/GTJmsKo.png";
const ghostFrontImage = "https://i.imgur.com/RF0q2DH.png";
const ghostSideImage = "https://i.imgur.com/WzIJXdV.png";

const LoginClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const loginClientMutation = useLoginClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await loginClientMutation.mutateAsync(data);
      toast.success(`Login bem-sucedido! Bem-vindo, ${data.username}!`);
      setTimeout(() => {
        navigate("/reservations");
      }, 3000);
    } catch (error) {
      toast.error("Usuário ou senha incorretos. Tente novamente.");
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/client/password/recover");
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Flex position="relative" alignItems="flex-end">
          <Image
            src={ghostFrontImage}
            alt="Fantasma de Frente"
            position="absolute"
            bottom="30px"
            left="-290px" // Adjust this value to position the ghost correctly
            width="auto"
            height="200px"
            display={{ base: "none", md: "block" }}
          />
          <Container maxW="container.md" position="relative" zIndex={1}>
            <Flex direction="column" align="center" justify="center">
              <HStack alignItems={"flex-start"} mb={8}>
                <Image
                  src={moonImage}
                  alt="Login Icon"
                  width="auto"
                  height="75px"
                  mr={3}
                />
                <Text
                  fontFamily="Trancinfont"
                  fontSize="6xl"
                  letterSpacing={"-0.07em"}
                >
                  LOGIN CLIENTE
                </Text>
              </HStack>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <VStack spacing={10} alignItems={"center"}>
                  <VStack width={"100%"} spacing={4}>
                    <FormControl isInvalid={!!errors.username} maxWidth="400px">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input
                        data-cy="username-c"
                        id="username-c"
                        placeholder="Username"
                        {...register("username")}
                      />
                      {errors.username && (
                        <Text color="red.500">{errors.username.message}</Text>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.password} maxWidth="400px">
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <InputGroup>
                        <Input
                          data-cy="password-c"
                          id="password-c"
                          alignSelf={"center"}
                          type={showPassword ? "text" : "password"}
                          placeholder="Senha"
                          {...register("password")}
                        />
                        <InputRightElement width="4.5rem">
                          <IconButton
                            h="1.75rem"
                            size="sm"
                            onClick={handleClick}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            aria-label={""}
                            variant="
                             unstyled"
                          />
                        </InputRightElement>
                      </InputGroup>
                      {errors.password && (
                        <Text color="red.500">{errors.password.message}</Text>
                      )}
                    </FormControl>
                  </VStack>
                  <ButtonGroup spacing={4}>
                    <Button
                      data-cy="login-button-c"
                      id="login-button-c"
                      type="submit"
                      colorScheme="red"
                      fontWeight={400}
                      isLoading={loginClientMutation.isPending}
                      bg="#A4161A"
                    >
                      Entrar
                    </Button>
                    <Button
                      data-cy="esqueci-senha-c"
                      variant="outline"
                      borderColor="#A4161A"
                      fontWeight={400}
                      color={"white"}
                      _hover={{
                        bg: "#A4161A",
                        color: "white",
                      }}
                      onClick={handleForgotPasswordClick}
                    >
                      Esqueci a Senha
                    </Button>
                  </ButtonGroup>
                </VStack>
              </form>
              <Box textAlign="left" mt={6}>
                <Text>
                  Ainda não possui conta? <br />
                  Cadastre-se como{" "}
                  <Link
                    color="#0097B2"
                    fontWeight={800}
                    href="/client/register"
                  >
                    Cliente
                  </Link>
                  , para fazer reservas incríveis.
                  <br />
                </Text>
              </Box>
              <Box mt={6} minWidth="60%">
                <Image src={barImage} alt="Barra Amarela" width="100%" />
              </Box>
            </Flex>
          </Container>
          <Image
            src={ghostSideImage}
            alt="Fantasma de Lado"
            position="absolute"
            bottom="30px"
            right="-230px" // Adjust this value to position the ghost correctly
            width="230px"
            height="auto"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoginClient;