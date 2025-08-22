import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { getReservationsByClient } from '../../services';
import { ReserveModel } from '../../models/reserve';
import { useClientData } from "../../../auth/hooks/useUserData"
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<ReserveModel[]>([]);
  const [publishedReservations, setPublishedReservations] = useState<{ [key: number]: PublishedReservationModel }>({});
  const { data } = useClientData();
  const client_id = Number(data?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log(`${client_id}`);
        const response = await getReservationsByClient(Number(client_id));
        setReservations(response);

        const publishedReservationsData: { [key: number]: PublishedReservationModel } = {};
        for (const reservation of response) {
          const publishedReservation = await getPublishedReservationById(reservation.publishedReservationId);
          publishedReservationsData[reservation.publishedReservationId] = publishedReservation;
        }
        setPublishedReservations(publishedReservationsData);
      } catch (error) {
        //const err = error as { response: { data: { message: string } } };
        //toast.error(`${err.response.data.message}`);
      }
    };

    fetchReservations();
  },[client_id]);

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

  return (
    <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box p="50px" position="relative">
        <Box fontFamily="Trancinfont" mt="-25px" fontSize="50px" textAlign="center" color="#eaeaea">Minhas reservas</Box>
        <Flex flexWrap="wrap" gap="75px" mt="30px">
          {reservations.map((reservation) => {
            const publishedReservation = publishedReservations[reservation.publishedReservationId];
            if (!publishedReservation) {
              return null;
            }
            const status = getStatus(reservation.checkin, reservation.checkout);
            const statusColor = getStatusColor(status);
            return (
              <Box key={reservation.id} position="relative" w="300px" h="330px" _hover={{ transform: 'translateY(-5px)' }}>
                <Box position="relative" w="296px" h="330px" bg="transparent" borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" onClick={() => navigate(`/see-reservation/${reservation.id}`)}>
                  <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px" style={{ backgroundImage: `url(http://localhost:5001${publishedReservation.imageUrl})` }}></Box>
                  <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{publishedReservation.name}</Box>
                  <Box fontSize="14px" color={statusColor} textAlign="start">{status}</Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

export default MyReservations;














