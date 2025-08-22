import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetTokenInputs, ResetTokenSchema } from "../../../forms/reset-form";
import { useResetPasswordClientMutation } from "../../../hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wizardImage = "https://i.imgur.com/En0qPaO.png";
const booImage = "https://i.imgur.com/1oLAmzY.png";

export const ResetPasswordClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPasswordClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetTokenInputs>({
    resolver: zodResolver(ResetTokenSchema),
  });

  const onSubmit = async (data: ResetTokenInputs) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => {
        navigate("/client/login");
      }, 3000);
    } catch (error) {
      toast.error("Falha ao redefinir a senha. Tente novamente.");
    }
  };

  const handleSendEmailAgainClick = () => {
    navigate("/client/password/recover");
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Flex
          position="relative"
          alignItems="flex-end"
          ml={{ base: "0", lg: "-10%" }}
        >
          <Container maxW="container.md" position="relative" zIndex={1}>
            <Flex direction="column" align="center" justify="center">
              <HStack alignItems={"flex-start"} mb={5}>
                <Image
                  src={booImage}
                  alt="Reset Password Icon"
                  width="auto"
                  height="90px"
                  mr={3}
                />
                <Text
                  fontFamily="Trancinfont"
                  fontSize="7xl"
                  letterSpacing={"-0.07em"}
                >
                  recuperação de Senha
                </Text>
              </HStack>
              <Text fontSize={"20px"} fontWeight={"300"} mb={4}>
                Não se assuste! Cole abaixo o token que
                <br />
                você recebeu por e-mail e escolha sua
                <br />
                nova senha.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Flex
                  direction="column"
                  align="flex-start"
                  mx="auto"
                  maxWidth="400px"
                >
                  <FormControl
                    isInvalid={!!errors.token}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="token">Token</FormLabel>
                    <Input
                      id="token"
                      type="text"
                      placeholder="Digite seu Token"
                      {...register("token")}
                    />
                    <FormErrorMessage>
                      {errors.token && errors.token.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.newPassword}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="newPassword">Nova Senha</FormLabel>
                    <InputGroup>
                      <Input
                        id="newPassword"
                        alignSelf={"center"}
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        {...register("newPassword")}
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
                    <FormErrorMessage>
                      {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.confirmPassword}
                    mb={4}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirme a Nova Senha
                    </FormLabel>
                    <InputGroup>
                      <Input
                        id="confirmPassword"
                        alignSelf={"center"}
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua nova senha"
                        {...register("confirmPassword")}
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
                    <FormErrorMessage>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <ButtonGroup spacing={4}>
                    <Button
                      mt={6}
                      colorScheme="red"
                      bg="#A4161A"
                      type="submit"
                      isLoading={resetPasswordMutation.isPending}
                      loadingText="Confirmando"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      Confirmar
                    </Button>
                    <Button
                      mt={6}
                      colorScheme="red"
                      type="button"
                      variant="outline"
                      borderColor="#A4161A"
                      color={"white"}
                      _hover={{
                        bg: "transparent",
                        //color: "red.500",
                        borderColor: "red.500",
                      }}
                      onClick={handleSendEmailAgainClick}
                    >
                      Enviar novamente
                    </Button>
                  </ButtonGroup>
                </Flex>
              </form>
            </Flex>
          </Container>
          <Image
            src={wizardImage}
            alt="Feiticeiro"
            position="absolute"
            bottom="0"
            right="-270px"
            width="auto"
            height="480px"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ResetPasswordClient;
