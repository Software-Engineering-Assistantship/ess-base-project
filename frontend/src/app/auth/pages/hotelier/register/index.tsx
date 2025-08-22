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
  useSteps,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  ButtonGroup,
  Progress,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegisterHotelierMutation } from "../../../hooks";
import {
  RegisterHotelierFormInputs,
  RegisterHotelierSchema,
} from "../../../forms/register-form";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import CustomInputMask from "./CustomInputMask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tombstoneImage = "https://i.imgur.com/yLVjxc0.png";
const witchImage = "https://i.imgur.com/2GXn2sj.png";

const steps = [{ title: "Seus Dados" }, { title: "Dados do Hotel" }];

const RegisterHotelier: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const { activeStep, setActiveStep } = useSteps();
  const navigate = useNavigate();
  const registerHotelierMutation = useRegisterHotelierMutation();
  const toastChakra = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<RegisterHotelierFormInputs>({
    resolver: zodResolver(RegisterHotelierSchema),
  });

  const onSubmit = async (data: RegisterHotelierFormInputs) => {
    try {
      const newData = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        hotel: data.hotel,
        cnpj: data.cnpj,
        address: data.address,
        n_address: data.n_address,
        city: data.city,
        UF: data.UF,
        cep: data.cep.replace(/\D/g, ""),
      };
      await registerHotelierMutation.mutateAsync(newData);
      toast.success(`Cadastro bem-sucedido! Obrigado, ${data.username}!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/hotelier/login");
      }, 3000);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast.error("E-mail ou nome de usuário já existe.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("city", data.localidade);
          setValue("UF", data.uf);
        } else {
          toastChakra({
            title: "Erro",
            description: "CEP não encontrado.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        toastChakra({
          title: "Erro",
          description: "Erro ao buscar o CEP.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

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
              <HStack alignItems={"flex-start"} mb={1} mt={-18}>
                <Text
                  fontFamily="Trancinfont"
                  fontSize="6xl"
                  letterSpacing={"-0.07em"}
                >
                  CadasTro de hoTeleiro
                </Text>
              </HStack>
              <Text fontWeight={200} mb={5}>
                Tem um hotel para monstros ou humanos? Cadastre-o conosco e seja
                bem-vindo ao Hotel Trancinvânia!
              </Text>
              <Box position="relative" mb={3}>
                <Stepper index={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                      </Box>
                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
                <Progress
                  value={progress}
                  position="absolute"
                  height="3px"
                  width="full"
                  top="10px"
                  zIndex={-1}
                />
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                {activeStep === 0 && (
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
                            data-cy="name-rh"
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
                            data-cy="email-rh"
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
                            data-cy="username-rh"
                            id="username"
                            placeholder="Username"
                            {...register("username")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.username && (
                            <Text color="red.500">
                              {errors.username.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.password}>
                          <FormLabel htmlFor="password">Senha</FormLabel>
                          <InputGroup>
                            <Input
                              data-cy="password-rh"
                              id="password"
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
                            <Text color="red.500">
                              {errors.password.message}
                            </Text>
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
                              data-cy="confirmPassword-rh"
                              id="confirmPassword"
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
                      <GridItem colSpan={1}>
                        <Flex
                          justify="flex-start"
                          w="full"
                          h="full"
                          align="flex-end"
                        >
                          <Button
                            data-cy="continuar-rh"
                            onClick={handleNext}
                            colorScheme="red"
                            fontWeight={400}
                            bg="#A4161A"
                          >
                            Continuar
                          </Button>
                        </Flex>
                      </GridItem>
                    </SimpleGrid>
                  </VStack>
                )}
                {activeStep === 1 && (
                  <VStack spacing={10} alignItems={"flex-start"}>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={6}
                      width="100%"
                    >
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.hotel}>
                          <FormLabel htmlFor="hotel">Nome do Hotel</FormLabel>
                          <Input
                            data-cy="nome-hotel"
                            id="hotel"
                            placeholder="Nome do Hotel"
                            {...register("hotel")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.hotel && (
                            <Text color="red.500">{errors.hotel.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.cnpj}>
                          <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
                          <Controller
                            name="cnpj"
                            control={control}
                            render={({ field }) => (
                              <CustomInputMask
                                mask="99.999.999/9999-99"
                                id="cnpj"
                                data-cy="cnpj"
                                placeholder="00.000.000/0000-00"
                                {...field}
                                maxW={{ base: "100%", md: "300px" }}
                              />
                            )}
                          />
                          {errors.cnpj && (
                            <Text color="red.500">{errors.cnpj.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.cep}>
                          <FormLabel htmlFor="cep">CEP</FormLabel>
                          <Controller
                            name="cep"
                            control={control}
                            render={({ field }) => (
                              <CustomInputMask
                                mask="99999-999"
                                id="cep"
                                data-cy="cep"
                                placeholder="00000-000"
                                {...field}
                                maxW={{ base: "100%", md: "300px" }}
                                onBlur={(e) => handleCepBlur(e.target.value)}
                              />
                            )}
                          />
                          {errors.cep && (
                            <Text color="red.500">{errors.cep.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.address}>
                          <FormLabel htmlFor="address">Endereço</FormLabel>
                          <Input
                            id="address"
                            placeholder="Endereço do Hotel"
                            {...register("address")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.address && (
                            <Text color="red.500">
                              {errors.address.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.city}>
                          <FormLabel htmlFor="city">Cidade</FormLabel>
                          <Input
                            id="city"
                            placeholder="Cidade"
                            {...register("city")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.city && (
                            <Text color="red.500">{errors.city.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <HStack spacing={4}>
                          <FormControl isInvalid={!!errors.UF}>
                            <FormLabel htmlFor="uf">UF</FormLabel>
                            <Input
                              id="UF"
                              placeholder="UF"
                              {...register("UF")}
                              maxW={{ base: "100%", md: "140px" }}
                            />
                            {errors.UF && (
                              <Text color="red.500">{errors.UF.message}</Text>
                            )}
                          </FormControl>
                          <FormControl isInvalid={!!errors.n_address}>
                            <FormLabel htmlFor="n_address">Nº</FormLabel>
                            <Input
                              id="n_address"
                              data-cy="numero-hotel"
                              placeholder="Nº"
                              {...register("n_address")}
                              maxW={{ base: "100%", md: "140px" }}
                            />
                            {errors.n_address && (
                              <Text color="red.500">
                                {errors.n_address.message}
                              </Text>
                            )}
                          </FormControl>
                        </HStack>
                      </GridItem>
                    </SimpleGrid>
                    <ButtonGroup spacing={4} alignSelf="flex-end">
                      <Button onClick={handleBack} colorScheme="gray">
                        Voltar
                      </Button>
                      <Button
                        data-cy="confirmar-cadastro-h"
                        type="submit"
                        colorScheme="red"
                        fontWeight={400}
                        bg="#A4161A"
                        isLoading={registerHotelierMutation.isPending}
                        loadingText="Cadastrando"
                      >
                        Confirmar Cadastro
                      </Button>
                    </ButtonGroup>
                  </VStack>
                )}
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
                    onClick={() => navigate("/hotelier/login")}
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
                <HStack spacing={4} align="center">
                  <Image src={witchImage} width={"80px"} height={"auto"} />
                  <Text>Procurando novas aventuras?</Text>
                </HStack>
                <Button
                  alignSelf="flex-start"
                  mt={2}
                  onClick={() => navigate("/client/register")}
                  bg="#6A0572"
                  colorScheme="purple"
                  size="sm"
                >
                  Cadastre-se como Cliente
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default RegisterHotelier;
