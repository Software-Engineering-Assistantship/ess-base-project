import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import maisImg from './mais.png';
import morcegoImg from './bat.png';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { deleteAllPromotions, getPromotionById } from '../../../Promotion/services';
import { getAllPublishedReservation } from '../../services';
import { PublishedReservationModel } from '../../models/publishedReservation';
import { PromotionModel } from '../../../Promotion/models/promotion';
import React from 'react';
import { useReservationContext } from '../../context';
import { useHotelierData } from '../../../auth/hooks/useUserData';

export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
const replaceSpacesAndRemoveAccents = (str) => {
    const withoutAccents = removeAccents(str);
    return withoutAccents.replace(/\s+/g, '-');
};

export const AllPublishedReservation = () => {
    const { reservations, setReservations, setSelectedReservation} = useReservationContext();
    const [promotion, setPromotion] = useState<PromotionModel>({} as PromotionModel);
    const [updateFlag, setUpdateFlag] = useState(false);
    const { data } = useHotelierData();


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
      },[updateFlag]);

    const navigate = useNavigate();

    const handleDeletePromotion = async() => {
        try{
            await deleteAllPromotions(Number(data?.id));
            setUpdateFlag(!updateFlag);
            toast.success('Promoções deletadas com sucesso!');
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

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
        navigate(`/reservationDetails`);
    };
    
    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <NavBar/>
            <Box p="50px" position="relative">
                    
                <Flex gap="20px">
                    <ButtonComponent  dataCy="publicReservationButton" id="publicReservationButton" label="Publicar Reserva" onClick={() => navigate('/publishedReservation')}/>
                    <ButtonComponent dataCy="cadastrar-promocao" id="cadastrar-promocao" label="Cadastrar Promoção" onClick={() => navigate('/promotions?action=createAll')}/>
                    <ButtonDeleteComponent dataCy="deletar-promocoes" id="deletar-promocoes" label="Deletar Promoções" onClick={handleDeletePromotion}/>
                </Flex>
                
                <Flex flexWrap="wrap" gap="75px" mt="50px">
                    {reservations.filter(reservation => reservation.hotelier_id === Number(data?.id)).sort((a, b) => a.id - b.id).map(reservation => (
                        <Box data-cy={`${replaceSpacesAndRemoveAccents(reservation.name)}`} id={`${replaceSpacesAndRemoveAccents(reservation.name)}`} position="relative" w="296px" h="330px" _hover={{transform: 'translateY(-5px)'}}>
                            {reservation.promotion_id && (
                                <Flex data-cy="bat" id="bat" alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="80%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== 0 && `${promotion[reservation.id]}%`}</Box></Flex>
                            )}
                            <Box position="relative" w="296px" h="330px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => handleReservationClick(reservation)}>
                                <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                                <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.name}</Box>
                                    <Flex textAlign="start" fontSize="20px" color="#eaeaea">R$ {reservation.new_price.toFixed(0)} { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" ml="5px" mt="3px"> R$ {reservation.price}</Box>}</Flex>
                                    <Box color="#eaeaea" mt="-2%"> a diária</Box>
                            </Box>
                        </Box>
                    ))}
                    <Box position="relative" width="290px" height="310px" bg="transparent" border="1px solid #eaeaea" borderRadius="10px" overflow="hidden" cursor="pointer" display="flex" alignItems="center" justifyContent="center" _hover={{transform: 'translateY(-5px)'}} onClick={() => navigate('/publishedReservation')}> <Box width="40%" height="40%" backgroundSize="contain" backgroundPosition="center" backgroundRepeat="no-repeat" style={{ backgroundImage: `url(${maisImg})` }}></Box></Box>
                </Flex>
            </Box>
            <ToastContainer position="top-right" theme='dark' autoClose={2000}/>
        </Box>
    );
}

const ButtonComponent = ({id, label, onClick, dataCy}) => {
    return (
        <Button data-cy={dataCy} id={id} bg="#eaeaea" onClick={onClick}>
            {label}
        </Button>
    )
}

const ButtonDeleteComponent = ({id, label, onClick, dataCy}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    return (
        <Box>
            <Button data-cy={dataCy} id={id} bg="#eaeaea" onClick={onOpen}>
                {label}
            </Button>
            <AlertDialog 
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent bg="#191919" color="#eaeaea" border="2px solid #eaeaea">
                    <AlertDialogHeader>Tem certeza?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                    Esta ação não pode ser desfeita e as promoções serão removidas permanentemente do sistema.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                        Não
                        </Button>
                        <Button data-cy="yes-button" id="yes-button"  ml={3} onClick={() => {
                            onClick();
                            onClose(); 
                        }}>
                        Sim
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    )
}