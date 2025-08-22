import { useEffect, useState } from 'react';
import { getPayMethodsByClient, deletePayMethodsById, postPayMethods, editPayMethods } from '../../services';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  IconButton,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavBar } from '../../../../shared/components/nav-bar';
import { colors } from '../../context/colors'; // Importe o arquivo de cores
import { CardModel, CardType } from '../../models/card';
import { useClientData } from "../../../auth/hooks/useUserData";

const getCardColor = (cvv) => {
  return colors.cardColors[cvv % 3];
};

const CartaoItem = ({ cartao, selecionado, onClick }) => (
  <Box
    //data-cy="cartao-item"
    onClick={onClick}
    bg={selecionado ? colors.cardHoverBackground : colors.cardBackground}
    p={4}
    borderRadius="md"
    cursor="pointer"
    display="flex"
    alignItems="center"
    width="100%"
    height= "80%"
    borderWidth={selecionado ? 2 : 1}
    borderColor={selecionado ? colors.cardBorderSelected : colors.cardBorder}
  >
    <Box bg={getCardColor(cartao.cvv)} width="50px" height="30px" mr={4} />
    <Box flex="1" >
      <Text fontSize="sm" data-cy="cartao-item-text">Cartão de {cartao.type === CardType.CREDITO ? 'crédito' : 'débito'} com final **** {cartao.numCard ? cartao.numCard.slice(-4) : 'Número desconhecido'}</Text>
    </Box>
  </Box>
);

const CartaoDetalhes = ({ cartao, onEdit, onDelete }) => {
  if (!cartao) {
    return null;
  }

  const { name, numCard, type, cvv } = cartao;

  return (
    <Box bg="#EAEAEA" p={6} borderRadius="md" boxShadow="md" width={{ base: '100%', md: '500px' }} mt={{ base: 4, md: 0 }}>
      <Box
        bg={getCardColor(cvv)}
        height="250px"
        borderRadius="md"
        mb={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        position="relative"
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          position="absolute"
          top={4}
          left={4}
        >
          {type === CardType.CREDITO ? 'Crédito' : 'Débito'}
        </Text>
        <Text
          fontSize="md"
          position="absolute"
          bottom={4}
          right={4}
        >
          **** {numCard ? numCard.slice(-4) : 'Número desconhecido'}
        </Text>
        <Text
          position="absolute"
          bottom={4}
          left={4}
          mb={2}
        >
          {name || 'Nome desconhecido'}
        </Text>
      </Box>
      <HStack justify="center" spacing={4}>
        <Button data-cy="edit-button" variant="link" colorScheme={colors.buttonTextEdit} onClick={() => onEdit(cartao)}>Editar</Button>
        <Button data-cy="delete-button" variant="link" colorScheme={colors.buttonTextDelete} onClick={() => onDelete(cartao.id)}>Excluir</Button>
      </HStack>
    </Box>
  );
};

const Cartoes = () => {
  const { data } = useClientData();
  const client_id = Number(data?.id);
  

  const [cartoes, setCartoes] = useState<CardModel[]>([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<CardModel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<CardModel>({
    id: 0,
    name: '',
    numCard: '',
    cvv: 0,
    expiryDate: '',
    type: CardType.CREDITO,
    clientId: client_id, // Substitua isso pelo método real de obter o clientId
    cpf: '',
  });
  const clientId = client_id; // Substitua isso pelo método real de obter o clientId
  const toast = useToast();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cartoesData: CardModel[] = await getPayMethodsByClient(clientId);
        setCartoes(cartoesData);
        if (cartoesData.length > 0) {
          setCartaoSelecionado(cartoesData[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar cartões:', error);
      }
    };

    if (clientId) {
      fetchCard();
    }
  }, [clientId]);

  const handleAddEditCartao = async () => {
    try {
      if (isEditing) {
        await editPayMethods(formValues.id, formValues);
      } else {
        await postPayMethods(formValues);
      }
      toast({
        title: isEditing ? 'Cartão atualizado com sucesso.' : 'Cartão adicionado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
        containerStyle: {
          backgroundColor: '#A4161A',
          color: '#EAEAEA',
        },
      });
      // Refresh the card list
      const cartoesData: CardModel[] = await getPayMethodsByClient(clientId);
      setCartoes(cartoesData);
      setIsOpen(false);
      setFormValues({
        id: 0,
        name: '',
        numCard: '',
        cvv: 0,
        expiryDate: '',
        type: CardType.CREDITO,
        clientId: clientId,
        cpf: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar o cartão:', error);
      toast({
        title: 'Erro ao salvar o cartão.',
        description: 'Ocorreu um erro ao tentar salvar o cartão. Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const handleAddCartao = () => {
    setIsEditing(false);
    setFormValues({
      id: 0,
      name: '',
      numCard: '',
      cvv: NaN,
      expiryDate: '',
      type: CardType.CREDITO,
      clientId: clientId,
      cpf: '',
    });
    setIsOpen(true);
  };

  const handleEditCartao = (cartao: CardModel) => {
    setIsEditing(true);
    setFormValues(cartao);
    setIsOpen(true);
  };

  const handleDeleteCartao = async (cartaoId: number) => {
    try {
      await deletePayMethodsById(clientId, cartaoId);
      setCartoes(cartoes.filter(cartao => cartao.id !== cartaoId));
      if (cartaoSelecionado && cartaoSelecionado.id === cartaoId) {
        setCartaoSelecionado(null);
      }
      toast({
        title: 'Cartão excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
        containerStyle: {
          backgroundColor: '#A4161A',
          color: '#EAEAEA',
        },
      });
    } catch (error) {
      console.error('Erro ao deletar o cartão:', error);
      toast({
        title: 'Erro ao excluir o cartão.',
        description: 'Ocorreu um erro ao tentar excluir o cartão. Por favor, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Box bg={colors.background} minH="100vh" color={colors.text} display="flex" flexDirection="column" alignItems="center">
      <Box width="100%" zIndex={3} position="relative"> {/* Adicionando position relative */}
        <NavBar />
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={12}
        px={6}
        flexDirection="row"
        maxW="1200px"
        width="100%"
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
        zIndex={3} // Mantendo zIndex para garantir sobreposição
        position="relative" // Adicionando position relative
      >
        <Flex
          flexDirection="row"
          alignItems="flex-start"
          width="100%"
          maxW="1200px"
          justifyContent="center"
        >
          <Flex flexDirection="column" alignItems="center" width={{ base: '100%', md: '300px' }} mr={{ base: 0, md: 4 }}>
            <Box
              bg={colors.background}
              p={4}
              borderRadius="md"
              mb={4}
              width="100%"
              maxH="200px"
              overflowY="auto"
              boxShadow="md"
              zIndex={3} // Garantir que fique sobre a imagem
              position="relative"
            >
              <Text fontSize="6xl" mb={4} fontFamily="Trancinfont" fontWeight="400" letterSpacing={"-0.07em"} color={colors.title}>CarTeira</Text>
              <Text fontSize="3xl" mb={4} fontFamily="Trancinfont" fontWeight="400" letterSpacing={"-0.07em"} color={colors.title}>CarTões CadasTrados</Text>
            </Box>
            <Box
              bg={colors.cardBackground}
              p={4}
              borderRadius="md"
              mb={4}
              width="100%"
              maxH="200px"
              overflowY="auto"
              boxShadow="md"
              zIndex={3} // Garantir que fique sobre a imagem
              position="relative"
            >
              <VStack spacing={4} width="100%">
                {cartoes.map(cartao => (
                  <CartaoItem
                    //data-cy="cartao-item"
                    key={cartao.id}
                    cartao={cartao}
                    selecionado={cartaoSelecionado && cartao.id === cartaoSelecionado.id}
                    onClick={() => setCartaoSelecionado(cartao)}
                  />
                ))}
                <Box
                  bg={colors.addCardBackground}
                  p={4}
                  borderRadius="md"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  border={`1px dashed ${colors.addCardBorder}`}
                  onClick={handleAddCartao}
                >
                  <HStack spacing={4} justify="center">
                    <Text>Adicione um método de pagamento</Text>
                    <IconButton
                      icon={<AddIcon />}
                      data-cy="add-card-button"
                      colorScheme="teal"
                      aria-label="Adicionar novo método de pagamento"
                    />
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Flex>
          {cartaoSelecionado && (
            <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} width={{ base: '100%', md: '500px' }} display="flex" alignItems="center" position="relative">
              <CartaoDetalhes
                cartao={cartaoSelecionado}
                onEdit={handleEditCartao}
                onDelete={handleDeleteCartao}
              />
            </Box>
          )}
        </Flex>
      </Flex>
  
      {/* Modal for adding/editing card */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent  data-cy="modal" >
          <ModalHeader>{isEditing ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                data-cy="name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Número do Cartão</FormLabel>
              <Input
                data-cy="numCard"
                maxLength={16}
                value={formValues.numCard}
                onChange={(e) => setFormValues({ ...formValues, numCard: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>CVV</FormLabel>
              <Input
                data-cy="cvv"
                type="number"
                maxLength={3}
                value={formValues.cvv}
                onChange={(e) => setFormValues({ ...formValues, cvv: Number(e.target.value) })}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Data de Expiração</FormLabel>
              <Input
                data-cy="expiryDate"
                maxLength={7}
                value={formValues.expiryDate}
                onChange={(e) => setFormValues({ ...formValues, expiryDate: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Tipo</FormLabel>
              <Select
                data-cy="type-select"
                value={formValues.type}
                onChange={(e) => setFormValues({ ...formValues, type: e.target.value as CardType })}
              >
                <option value={CardType.CREDITO}>Crédito</option>
                <option value={CardType.DEBITO}>Débito</option>
              </Select>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>CPF</FormLabel>
              <Input
                data-cy="cpf"
                maxLength={11}
                value={formValues.cpf}
                onChange={(e) => setFormValues({ ...formValues, cpf: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button data-cy="save-button" colorScheme="teal" mr={3} onClick={handleAddEditCartao}>
              {isEditing ? 'Salvar Alterações' : 'Adicionar Cartão'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  
      {/* Imagem de fundo 1 */}
      <Box
        position="absolute"
        bottom={0}
        right={0}
        width={{ base: '150px', sm: '200px', md: '230px' }}
        height={{ base: '250px', sm: '300px', md: '350px' }}
        zIndex={1} // Garantir que fique atrás de outros elementos
        overflow="hidden"
        border="none"
      >
        <img
          src="https://i.imgur.com/En0qPaO.png"
          alt="mago"
          style={{ width: '100%', height: '100%', objectFit: 'contain', border: 'none' }}
        />
      </Box>
  
      {/* Imagem de fundo 2 */}
      <Box
        position="absolute"
        top={{ base: '60px', sm: '70px', md: '80px' }} // Ajuste conforme a altura da sua NavBar
        left={0}
        width={{ base: '150px', sm: '180px', md: '200px' }}
        height={{ base: '200px', sm: '230px', md: '250px' }}
        zIndex={1} // Garantir que fique atrás de outros elementos
        overflow="hidden"
        border="none"
      >
        <img
          src="https://i.imgur.com/9Nrhfzb.png"
          alt="aranha"
          style={{ width: '100%', height: '100%', objectFit: 'contain', border: 'none' }}
        />
      </Box>
    </Box>
  );
  
};

export default Cartoes;
