import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useCreateTest } from "../../hooks";

const CreateTest = () => {
  const createTestsMutation = useCreateTest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormType>({
    resolver: zodResolver(TestFormSchema),
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<TestFormType> = async (body) => {
    await createTestsMutation
      .mutateAsync(body)
      .then(() => {
        toast({
          title: "Teste criado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao criar teste",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    reset();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading as="h1" marginBottom={"4"}>
        Crie um teste
      </Heading>

      <Box
        as="form"
        width="400px"
        p={8}
        borderWidth={1}
        borderRadius="md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              data-cy="input-name"
              placeholder="Digite o nome"
              {...register("name")}
            />
            {errors.name && (
              <FormErrorMessage data-cy="input-name-error">
                {errors.name.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>

        <VStack mt={4} spacing={4} w="full">
          <Button
            isLoading={createTestsMutation.isPending}
            w="full"
            data-cy="create"
            type="submit"
            colorScheme="blue"
          >
            CRIAR
          </Button>
          <Button
            w="full"
            as={Link}
            to="/tests"
            colorScheme="teal"
            variant="outline"
          >
            VER TESTS
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateTest;
