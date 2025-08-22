import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { ISearch } from "../../search/models";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const today = new Date();
  const todayPlusFive = new Date();
  todayPlusFive.setDate(today.getDate() + 5);

  const [destino, setDestino] = useState("");
  const [checkin, setCheckin] = useState(today.toISOString().split("T")[0]);
  const [checkout, setCheckout] = useState(todayPlusFive.toISOString().split("T")[0]);
  const [numAdultos, setNumAdultos] = useState(0);
  const [numCriancas, setNumCriancas] = useState(0);
  const [numRooms, setNumRooms] = useState(0);


  const navigate = useNavigate();

  const handleDestino = (event) => {
    setDestino(event.target.value);
  };

  const handleCheckin = (event) => {
    setCheckin(event.target.value);
  };

  const handleCheckout = (event) => {
    setCheckout(event.target.value);
  };

  const searchCorrect = (search: ISearch) => {
    if(search.city.length === 0){
      toast.warning("Local não foi especificado");
      return false;
    }

    if(new Date(search.checkin) > new Date(search.checkout)){
      toast.warning("Data de checkin posterior a data de checkout");
      return false;
    }

    if(search.num_adults == 0){
      toast.warning("Quantidade de pessoas está errada");
      return false;
    }

    if(search.num_rooms == 0){
      toast.warning("Quantidade de quartos precisa ser maior que 0");
      return false;
    }

    return true;
  };


  const handleSearch = async () => {

    const search: ISearch = {
      city: destino,
      checkin,
      checkout,
      num_adults: numAdultos,
      num_children: numCriancas,
      num_rooms: numRooms
    }

    if(searchCorrect(search)){
      navigate(`/search?city=${destino}&checkin=${checkin}&checkout=${checkout}&num_adults=${numAdultos}&num_children=${numCriancas}&num_rooms=${numRooms}`)
    }
  }

  const increaseNumAdultos = () => {
    setNumAdultos(numAdultos + 1);
  }

  const decreaseNumAdultos = () => {
    if(numAdultos > 0){
      setNumAdultos(numAdultos - 1);
    }
  }

  const increaseNumCriancas = () => {
    setNumCriancas(numCriancas + 1);
  }

  const decreaseNumCriancas = () => {
    if(numCriancas > 0){
      setNumCriancas(numCriancas - 1);
    }
  }


  const increaseNumRooms = () => {
    setNumRooms(numRooms + 1);
  }

  const decreaseNumRooms = () => {
    if(numRooms > 0){
      setNumRooms(numRooms - 1);
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      mb={8}
      fontFamily="Inter"
      width="800px"
    >
      <Input
        placeholder="Destino"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        color={"black"}
        textAlign="center"
        variant="outline"
        ml={2}
        height="70px"
        width="130px"
        backgroundColor={"white"}
        borderRadius="0"
        borderLeftRadius="30"
        onChange={handleDestino}
        fontFamily="Inter"
        data-cy="destino"
      />
      <Input
        placeholder="Check-in"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        type="date"
        variant="outline"
        height="70px"
        width="180px"
        backgroundColor={"white"}
        color={"black"}
        borderRadius="0"
        onChange={handleCheckin}
        fontFamily="Inter"
        data-cy="checkin"
        defaultValue={today.toISOString().split("T")[0]}
      />
      <Input
        placeholder="Check-out"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        type="date"
        variant="outline"
        height="70px"
        width="180px"
        backgroundColor={"white"}
        color={"black"}
        borderRadius="0"
        onChange={handleCheckout}
        fontFamily="Inter"
        data-cy="checkout"
        defaultValue={todayPlusFive.toISOString().split("T")[0]}
      />
      <Popover>
        <PopoverTrigger>
          <Input
          placeholder="Detalhes"
          _placeholder={{ opacity: 1, color: 'black.500' }}
          variant="outline"
          height="70px"
          width="130px"
          textAlign={"center"}
          backgroundColor={"white"}
          borderRadius="0"
          fontFamily="Inter"
          data-cy="detalhes"
        />  
        </PopoverTrigger>
        <PopoverContent width="260px">
          <PopoverBody backgroundColor={'white'} color={'black'}>
            <Box p={4}>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Text fontWeight="bold">Adultos</Text>
                </Box>
                <Flex align="center">
                  <IconButton
                    aria-label="less"
                    icon={<MinusIcon />}
                    mx={2}
                    isDisabled={numAdultos == 0}
                    height="35px"
                    width="35px"
                    onClick={decreaseNumAdultos}
                    data-cy="less_adultos"
                  />
                  <Text mx={1} fontSize={'xl'}>
                    {numAdultos}
                  </Text>
                  <IconButton
                    aria-label="increase"
                    icon={<AddIcon />}
                    mx={2}
                    height="35px"
                    width="35px"
                    onClick={increaseNumAdultos}
                    data-cy="increase_adultos"
                  />
                </ Flex>
              </Flex>
              <Flex justify="space-between" align="center" mt={4} mb={4}>
                <Box>
                  <Text fontWeight="bold">Crianças</Text>
                </Box>
                <Flex align="center">
                  <IconButton
                    aria-label="less"
                    icon={<MinusIcon />}
                    mx={2}
                    isDisabled={numCriancas == 0}
                    height="35px"
                    width="35px"
                    onClick={decreaseNumCriancas}
                    data-cy="less_criancas"
                  />
                  <Text mx={1} fontSize={'xl'}>{numCriancas}</Text>
                  <IconButton
                    aria-label="increase"
                    icon={<AddIcon />}
                    mx={2}
                    height="35px"
                    width="35px"
                    onClick={increaseNumCriancas}
                    data-cy="increase_criancas"
                  />
                </Flex>
              </Flex>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Text fontWeight="bold">Quartos</Text>
                </Box>
                <Flex align="center">
                  <IconButton
                    aria-label="less"
                    icon={<MinusIcon />}
                    mx={2}
                    isDisabled={numRooms == 0}
                    height="35px"
                    width="35px"
                    onClick={decreaseNumRooms}
                    data-cy="less_quartos"
                  />
                  <Text mx={1} fontSize={'xl'}>{numRooms}</Text>
                  <IconButton
                    aria-label="increase"
                    icon={<AddIcon />}
                    mx={2}
                    height="35px"
                    width="35px"
                    onClick={increaseNumRooms}
                    data-cy="increase_quartos"
                  />
                </Flex>
              </ Flex>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        height="70px"
        width="70px"
        bg="white"
        colorScheme="red"
        color="red"
        onClick={() => (handleSearch())}
        borderRadius="0"
        borderRightRadius="30"
        _hover={{color: "white", bgColor:"red"}}
        data-cy="pesquisar"
      />
      <ToastContainer theme="dark"/>
    </Flex>
  );
};
