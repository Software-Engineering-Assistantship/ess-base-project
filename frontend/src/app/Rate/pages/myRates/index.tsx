import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Flex, IconButton, Tooltip, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { getReservationsByClient } from '../../../reservation/services'; 
import { getRatesByClientId, deleteRateById } from '../../services';
import { ReserveModel } from '../../../reservation/models/reserve'; 
import { RateModel } from '../../models';
import { useClientData } from "../../../auth/hooks/useUserData";
import { ToastContainer, toast } from 'react-toastify';
import { FaStar, FaTrashAlt, FaEdit } from 'react-icons/fa';

export const Rate = () => {
  const [reservations, setReservations] = useState<ReserveModel[]>([]);
  const [publishedReservations, setPublishedReservations] = useState<{ [key: number]: PublishedReservationModel }>({});
  const [rates, setRates] = useState<{ [key: number]: RateModel }>({});
  const { data } = useClientData();
  const client_id = Number(data?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservationsByClient(client_id);
        setReservations(response);

        const publishedReservationsData: { [key: number]: PublishedReservationModel } = {};
        for (const reservation of response) {
          const publishedReservation = await getPublishedReservationById(reservation.publishedReservationId);
          publishedReservationsData[reservation.publishedReservationId] = publishedReservation;
        }
        setPublishedReservations(publishedReservationsData);

        // Obter avaliações do cliente
        const ratesResponse = await getRatesByClientId(client_id);
        const ratesData: { [key: number]: RateModel } = {};
        for (const rate of ratesResponse) {
          ratesData[rate.reservation_id] = rate;
        }
        setRates(ratesData);

      } catch (error) {
        const err = error as { response: { data: { message: string } } };
        toast.error(`${err.response.data.message}`);
      }
    };

    fetchReservations();
  }, [client_id]);

  const getStatus = (checkin: string, checkout: string) => {
    const currentDate = new Date();
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (currentDate > checkoutDate) {
      return 'Reserva Concluída';
    } else if (currentDate >= checkinDate && currentDate <= checkoutDate) {
      return 'Reserva em Andamento';
    } else {
      return 'Reserva Futura';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reserva Concluída':
        return '#FF0000'; // Vermelho
      case 'Reserva em Andamento':
        return '#FAC006'; // Amarelo
      case 'Reserva Futura':
        return '#0097b2'; // Verde
      default:
        return '#EAEAEA'; // Branco
    }
  };

  // Filtrar reservas concluídas
  const completedReservations = reservations.filter(reservation => {
    const publishedReservation = publishedReservations[reservation.publishedReservationId];
    if (!publishedReservation) return false;
    const status = getStatus(reservation.checkin, reservation.checkout);
    return status === 'Reserva Concluída';
  });

  const handleReview = (reservationId: number) => {
    if (rates[reservationId]) {
      navigate(`/client/profile/rate/edit/${reservationId}`);
    } else {
      navigate(`/client/profile/rate/rating/${reservationId}`);
    }
  };

  const handleDelete = async (reservationId: number) => {
    try {
      await deleteRateById(client_id, reservationId);
      // Atualizar o estado após a exclusão
      setRates((prevRates) => {
        const { [reservationId]: _, ...rest } = prevRates;
        return rest;
      });
      toast.success('Avaliação excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir a avaliação.');
    }
  };

  return (
    <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box p="50px" position="relative">
        <Box fontFamily="Trancinfont" fontSize="6xl" mt="-25px" textAlign="center" color="#eaeaea">Minhas Avaliações</Box>
        <Flex flexWrap="wrap" gap="75px" mt="30px">
          {completedReservations.map((reservation) => {
            const publishedReservation = publishedReservations[reservation.publishedReservationId];
            if (!publishedReservation) {
              return null;
            }
            const status = getStatus(reservation.checkin, reservation.checkout);
            const statusColor = getStatusColor(status);
            const rate = rates[reservation.id]; // Obter a avaliação
            const hasRate = !!rate; // Verificar se há uma avaliação
            return (
              <Box key={reservation.id} position="relative" w="250px" _hover={{ transform: 'translateY(-5px)' }}>
                <Box position="relative" w="270px" bg="transparent" borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer">
                  <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px" style={{ backgroundImage: `url(http://localhost:5001${publishedReservation.imageUrl})` }}></Box>
                  <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{publishedReservation.name}</Box>
                  <Box fontSize="14px" color={statusColor} textAlign="start">{status}</Box>
                  <Box position="absolute" bottom="10px" right="10px" display="flex" gap="10px">
                    <Tooltip label={hasRate ? "Editar Avaliação" : "Avaliar"} aria-label={hasRate ? "Editar Avaliação" : "Avaliar"}>
                      <IconButton
                        icon={hasRate ? <FaEdit /> : <FaStar />}
                        aria-label={hasRate ? "Editar Avaliação" : "Avaliar"}
                        onClick={() => handleReview(reservation.id)}
                        bg="transparent"
                        color="#EAEAEA"
                        _hover={{ color: '#6A0572' }}
                      />
                    </Tooltip>
                    {hasRate && (
                      <Tooltip label="Excluir Avaliação" aria-label="Excluir Avaliação">
                        <IconButton
                          icon={<FaTrashAlt />}
                          aria-label="Excluir Avaliação"
                          onClick={() => handleDelete(reservation.id)}
                          bg="transparent"
                          color="#EAEAEA"
                          _hover={{ color: '#6A0572' }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                  {hasRate && (
                    <Box mt="10px" p="10px" borderTop="1px solid #eaeaea">
                      <Flex>
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={index < rate.rating ? '#ffc107' : '#e4e5e9'}
                            size={20}
                          />
                        ))}
                      </Flex>
                      <Text color="#eaeaea" fontSize="14px" mt="5px">{rate.comments || 'Sem comentário'}</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Rate;
