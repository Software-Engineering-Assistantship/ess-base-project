import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useTestById } from "../../hooks";

const ListTest = () => {
  const { id } = useParams() as { id: string };
  const { data: test, error, isLoading } = useTestById(id);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {isLoading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Erro ao carregar test!
        </Alert>
      )}
      {test && (
        <Box p="4" borderWidth="1px" borderRadius="md">
          <Heading as="h2" size="lg" mb="4">
            {test.name}
          </Heading>
          <Text fontSize="md">ID: {test.id}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ListTest;
