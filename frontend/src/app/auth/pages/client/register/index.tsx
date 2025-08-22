import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegisterClientMutation } from "../../../hooks";
import {
  RegisterClientFormInputs,
  RegisterClientSchema,
} from "../../../forms/register-form";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tombstoneImage = "https://i.imgur.com/yLVjxc0.png";
const coffinImage = "https://i.imgur.com/F9i7OQE.png";

const RegisterClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const registerClientMutation = useRegisterClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterClientFormInputs>({
    resolver: zodResolver(RegisterClientSchema),
  });

  const onSubmit = async (data: RegisterClientFormInputs) => {
    try {
      const newData = {
        name: data.name,
        email: data.email,
        username: data.username,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
        password: data.password,
      };
      await registerClientMutation.mutateAsync(newData);
      toast.success(`Cadastro bem-sucedido! Obrigado, ${data.username}!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/client/login");
      }, 3000);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.error(error.response?.data?.message || "Erro desconhecido", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Container maxW="container.md">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "center", lg: "flex-start" }}
            justify="space-between"
            w="100%"
          >
            <Flex
              direction="column"
              align="flex-start"
              justify="center"
              w={{ base: "100%", lg: "75%" }}
              ml={{ base: "0", lg: "-20%" }}
            >
              <HStack alignItems={"flex-start"} mb={1}>
                <Text
                  fontFamily="Trancinfont"
                  fontSize="6xl"
                  letterSpacing={"-0.07em"}
                >
                  CadasTro de ClienTe
                </Text>
              </HStack>
              <Text fontWeight={200} mt={-18} mb={5}>
                Monstro ou humano, te damos as boas-vindas. Faça já seu
                cadastro.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <VStack spacing={10} alignItems={"flex-start"}>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={6}
                    width="100%"
                  >
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.name}>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input
                          data-cy="name"
                          id="name"
                          placeholder="Nome Completo"
                          {...register("name")}
                          maxW={{ base: "100%", md: "300px" }}
                        />
                        {errors.name && (
                          <Text color="red.500">{errors.name.message}</Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.email}>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <Input
                          data-cy="email"
                          id="email"
                          placeholder="Digite seu e-mail"
                          {...register("email")}
                          maxW={{ base: "100%", md: "300px" }}
                        />
                        {errors.email && (
                          <Text color="red.500">{errors.email.message}</Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                          data-cy="username-rc"
                          id="username"
                          placeholder="Username"
                          {...register("username")}
                          maxW={{ base: "100%", md: "300px" }}
                        />
                        {errors.username && (
                          <Text color="red.500">{errors.username.message}</Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.cpf}>
                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                        <Controller
                          name="cpf"
                          control={control}
                          render={({ field }) => (
                            <Input
                              as={InputMask}
                              mask="999.999.999-99"
                              id="cpf"
                              data-cy="cpf"
                              placeholder="000.000.000-00"
                              {...field}
                              maxW={{ base: "100%", md: "300px" }}
                            />
                          )}
                        />
                        {errors.cpf && (
                          <Text color="red.500">{errors.cpf.message}</Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.phone}>
                        <FormLabel htmlFor="phone">
                          Número de Telefone
                        </FormLabel>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <Input
                              as={InputMask}
                              mask="(99) 99999-9999"
                              id="phone"
                              data-cy="phone"
                              placeholder="Digite seu número com DDD"
                              {...field}
                              maxW={{ base: "100%", md: "300px" }}
                            />
                          )}
                        />
                        {errors.phone && (
                          <Text color="red.500">{errors.phone.message}</Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.birthDate}>
                        <FormLabel htmlFor="birthDate">
                          Data de Nascimento
                        </FormLabel>
                        <Controller
                          name="birthDate"
                          control={control}
                          render={({ field }) => (
                            <Input
                              as={InputMask}
                              mask="9999/99/99"
                              id="birthDate"
                              data-cy="birthDate"
                              placeholder="aaaa/mm/dd"
                              {...field}
                              maxW={{ base: "100%", md: "300px" }}
                            />
                          )}
                        />
                        {errors.birthDate && (
                          <Text color="red.500">
                            {errors.birthDate.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <InputGroup>
                          <Input
                            id="password"
                            data-cy="password"
                            alignSelf={"center"}
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            {...register("password")}
                          />
                          <InputRightElement width="4.5rem">
                            <IconButton
                              h="1.75rem"
                              size="sm"
                              onClick={handleClick}
                              icon={
                                showPassword ? <ViewOffIcon /> : <ViewIcon />
                              }
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
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl isInvalid={!!errors.confirmPassword}>
                        <FormLabel htmlFor="confirmPassword">
                          Confirmação de Senha
                        </FormLabel>
                        <InputGroup>
                          <Input
                            id="confirmPassword"
                            data-cy="confirmPassword"
                            alignSelf={"center"}
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite a senha novamente"
                            {...register("confirmPassword")}
                          />
                          <InputRightElement width="4.5rem">
                            <IconButton
                              h="1.75rem"
                              size="sm"
                              onClick={handleClick}
                              icon={
                                showPassword ? <ViewOffIcon /> : <ViewIcon />
                              }
                              aria-label={""}
                              variant="
                             unstyled"
                            />
                          </InputRightElement>
                        </InputGroup>

                        {errors.confirmPassword && (
                          <Text color="red.500">
                            {errors.confirmPassword.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>
                  <Button
                    data-cy="confirmar-cadastro"
                    alignSelf="flex-end"
                    type="submit"
                    colorScheme="red"
                    fontWeight={400}
                    bg="#A4161A"
                    isLoading={registerClientMutation.isPending}
                    loadingText="Cadastrando"
                  >
                    Confirmar Cadastro
                  </Button>
                </VStack>
              </form>
            </Flex>
            <VStack
              spacing={8}
              align="center"
              justify="center"
              w={{ base: "100%", lg: "35%" }}
              mt={100}
              h="full"
            >
              <HStack spacing={4} align="center">
                <Image src={tombstoneImage} width={"auto"} height={"120px"} />
                <VStack spacing={2} align="center">
                  <Text>Já tem conta?</Text>
                  <Button
                    onClick={() => navigate("/client/login")}
                    bg="#6A0572"
                    colorScheme="purple"
                    width="full"
                    size="sm"
                  >
                    Login
                  </Button>
                </VStack>
              </HStack>
              <VStack spacing={2} align="center">
                <Image src={coffinImage} width={"173px"} height={"auto"} />
                <Text>Deseja anunciar sua propriedade?</Text>
                <Button
                  onClick={() => navigate("/hotelier/register")}
                  bg="#6A0572"
                  colorScheme="purple"
                  size="sm"
                >
                  Cadastre-se como Hoteleiro
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default RegisterClient;
