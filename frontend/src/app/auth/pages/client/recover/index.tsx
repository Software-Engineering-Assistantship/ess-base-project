import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSendRecoveryEmailClientMutation } from "../../../hooks";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import {
  RecoveryFormInputs,
  RecoverySchema,
} from "../../../forms/recovery-form";

const keyImage = "https://i.imgur.com/5GmX6rc.png";
const mummyImage = "https://i.imgur.com/zhv11La.png";
const zoombieImage = "https://i.imgur.com/Y0svuZU.png";

export const RecoverPasswordClient: React.FC = () => {
  const navigate = useNavigate();
  const sendRecoveryEmailMutation = useSendRecoveryEmailClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormInputs>({
    resolver: zodResolver(RecoverySchema),
  });

  const onSubmit = async (data: RecoveryFormInputs) => {
    try {
      await sendRecoveryEmailMutation.mutateAsync(data);
      toast.success(
        "Token enviado para o seu e-mail! Verifique sua caixa de entrada."
      );
      setTimeout(() => {
        navigate("/client/password/reset");
      }, 3000);
    } catch (error) {
      toast.error("Falha ao enviar o e-mail de recuperação. Tente novamente.");
    }
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Flex position="relative" alignItems="flex-end">
          <Image
            src={mummyImage}
            alt="Múmia"
            position="absolute"
            bottom="0"
            left="-190px"
            width="auto"
            height="480px"
            display={{ base: "none", md: "block" }}
          />
          <Container maxW="container.md" position="relative" zIndex={1}>
            <Flex direction="column" align="center" justify="center">
              <HStack alignItems={"flex-start"} mb={5}>
                <Image
                  src={keyImage}
                  alt="Recover Password Icon"
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
                Esqueceu sua senha? Digite o e-mail que você
                <br />
                cadastrou no campo abaixo e te enviaremos um
                <br />
                token para recuperá-la.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Flex
                  direction="column"
                  align="flex-start"
                  mx="auto"
                  maxWidth="400px"
                >
                  <FormControl
                    isInvalid={!!errors.email}
                    mb={1}
                    mt={6}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      data-cy="email-rp-c"
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      {...register("email")}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    data-cy="enviar-rp-c"
                    mt={6}
                    colorScheme="red"
                    bg="#A4161A"
                    type="submit"
                    isLoading={sendRecoveryEmailMutation.isPending}
                    loadingText="Enviando"
                  >
                    Enviar
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Container>
          <Image
            src={zoombieImage}
            alt="Zumbi"
            position="absolute"
            bottom="0"
            right="-220px"
            width="auto"
            height="410px"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default RecoverPasswordClient;
