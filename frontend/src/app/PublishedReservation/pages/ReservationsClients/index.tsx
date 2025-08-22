import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import morcegoImg from '../Reservations/bat.png';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import {  getPromotionById } from '../../../Promotion/services';
import { getAllPublishedReservation } from '../../services';
import { PublishedReservationModel } from '../../models/publishedReservation';
import { PromotionModel } from '../../../Promotion/models/promotion';
import { useReservationContext } from '../../context';

export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
const replaceSpacesAndRemoveAccents = (str) => {
    const withoutAccents = removeAccents(str);
    return withoutAccents.replace(/\s+/g, '-');
};

export const AllPublishedReservationClient = () => {
    const { reservations, setReservations, setSelectedReservation} = useReservationContext();
    const [promotion, setPromotion] = useState<PromotionModel>({} as PromotionModel);


    useEffect(() => {
        const fetchReservations = async () => {
          try {
            const response = await getAllPublishedReservation();
            setReservations(response);
          } catch (error) {
            console.error('Erro ao obter as reservas:', error);
          }
        };
    
        fetchReservations();
      });

    const navigate = useNavigate();

    

    const handlePromotionChange = async (reservation_id: number) => {
        try {
            const data = await getPromotionById(reservation_id);
            const discount = data.discount ?? 0;
            setPromotion((prevPromotions) => ({
                ...prevPromotions,
                [reservation_id]: discount,
            }));
        } catch (error) {
            console.error('Erro ao obter promoção:', error);
        }
    };

    useEffect(() => {
        reservations.forEach((reservation) => {
            if (reservation.promotion_id) {
                handlePromotionChange(reservation.id);
            }
        });
    }, [reservations]);

    const handleReservationClick = (reservation: PublishedReservationModel) => {
        setSelectedReservation(reservation);
        navigate(`/select-reservation`);
    };


    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <NavBar/>
            <Box p="50px" position="relative">
                <Box fontFamily="Trancinfont" mt="-15px" fontSize="50px"  letterSpacing={"-0.07em"} textAlign="center" color="#eaeaea">Faça já a sua reserva!</Box>
                    <Flex flexWrap="wrap" gap="75px" mt="42px">
                        {reservations.sort((a, b) => a.id - b.id).map(reservation => (
                            <Box data-cy = {`${replaceSpacesAndRemoveAccents(reservation.name)}`} id={`${replaceSpacesAndRemoveAccents(reservation.name)}`} position="relative" mb="-3%" w="296px" h="330px" _hover={{transform: 'translateY(-5px)'}}>
                                {reservation.promotion_id && (
                                    <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="80%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== 0 && `${promotion[reservation.id]}%`}</Box></Flex>
                                )}
                            <Box position="relative" w="296px" h="330px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => handleReservationClick(reservation)}>
                                    <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                                    <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.name}</Box>
                                    <Flex textAlign="start" fontSize="20px" color="#eaeaea">R$ {reservation.new_price.toFixed(0)} { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" ml="5px" mt="3px"> R$ {reservation.price}</Box>}</Flex>
                                    <Box color="#eaeaea" mt="-2%"> a diária</Box>
                                </Box>
                            </Box>
                        ))}
                </Flex>
            </Box>
        </Box>
    );
}
