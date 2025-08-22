import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
//import { Fonts } from "../../../../shared/theme/Fonts";
import { DeleteIcon, ArrowForwardIcon } from "@chakra-ui/icons";
//import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { ToastContainer, toast } from "react-toastify";
import {
  getSavedReservationByClientId,
  deleteSavedReservationById,
} from "../../services";
import { useClientData } from "../../../auth/hooks/useUserData";
import { Link } from "react-router-dom"; // Verifique a importação

export const Whishlist = () => {
  const { data } = useClientData();
  const clientId = Number(data?.id);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!clientId) {
        toast.error("ID do cliente não encontrado.");
        return;
      }

      try {
        const Reservationdata = await getSavedReservationByClientId(clientId);
        setReservations(Reservationdata);
      } catch (error) {
        console.error("Erro ao obter as reservas salvas:", error);
        toast.error("Erro ao obter as reservas salvas.");
      }
    };

    fetchReservations();
  }, [clientId]);

  const handleDelete = async (reservationId: number) => {
    if (!clientId) {
      toast.error("ID do cliente não encontrado.");
      return;
    }

    try {
      await deleteSavedReservationById(clientId, reservationId);
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId)
      );
      toast.success("Reserva apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar a reserva:", error);
      toast.error("Erro ao deletar a reserva.");
    }
  };

  return (
    <>
      <Box
        bg="#191919"
        color="#EAEAEA"
        minH="100vh"
        fontFamily="Inter"
        position="relative"
      >
        <NavBar />
        <Box p="50px" position="relative">
          <Box fontFamily="Trancinfont" mt="-15px" fontSize="57px" textAlign="center" color="#eaeaea">Lista de Desejos</Box>
          <Flex flexWrap="wrap" gap="75px" mt="42px">
                        {reservations.sort((a, b) => a.id - b.id).map(reservation => (
                            <Box position="relative" mb="-3%" w="250px" h="320px">
                                <Box position="relative" w="270px" h="300px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} >
                                    <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                                    <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.name}</Box>
                                    <Flex justify="center" gap={10} mt="4%">
                                      <Button
                                        variant="ghost"
                                        color="#EAEAEA"
                                        _hover={{ bg: "#5e3a72" }}
                                        onClick={() => handleDelete(reservation.id)}
                                        aria-label="Delete"
                                        border="1px solid #eaeaea"
                                      >
                                        <DeleteIcon boxSize="16px" />
                                      </Button>
                                      <Link to={`/select-reservation`}>
                                        <Button
                                          variant="ghost"
                                          color="#EAEAEA"
                                          _hover={{ bg: "#5e3a72" }}
                                          aria-label="Go to reservation"
                                          border="1px solid #eaeaea"
                                        >
                                        <ArrowForwardIcon boxSize="16px" /> 
                                        </Button>
                                      </Link>
                                    </Flex>
                                </Box>
                            </Box>
                        ))}
                </Flex>
        </Box>
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </Box>
    </>
  );
};

export default Whishlist;