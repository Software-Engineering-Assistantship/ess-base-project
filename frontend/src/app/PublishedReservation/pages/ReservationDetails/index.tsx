import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Badge,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Divider,
} from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TeiaImg } from '../../../Promotion/pages';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { FaCar, FaCoffee, FaConciergeBell, FaSnowflake, FaWifi } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import {MdOutlineBedroomChild} from 'react-icons/md';
import { deletePromotion, getPromotionById } from '../../../Promotion/services';
import { deletePublishedReservation, getPublishedReservationById } from '../../services';
import { PublishedReservationModel } from '../../models/publishedReservation';
import { PromotionModel } from '../../../Promotion/models/promotion';
import React from 'react';
import { useReservationContext } from '../../context';

export const ReservationDetails = () => {
    //const { reservation_id } = useParams();
    const [reservationData, setReservationData] = useState<PublishedReservationModel>({} as PublishedReservationModel);
    const { selectedReservation } = useReservationContext();
    const [updateFlag, setUpdateFlag] = useState(false);
    const [promotionData, setPromotionData] = useState<PromotionModel>({} as PromotionModel);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservationData = async () => {
            if(selectedReservation?.id){
                try {
                    const response = await getPublishedReservationById(selectedReservation.id) ?? '';
                    setReservationData(response);
                    const promotion = await getPromotionById(selectedReservation.id);
                    if(promotion){
                        setPromotionData(promotion);
                    }
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };

        fetchReservationData();
    }, [ updateFlag]);

    const handleDeleteReservation = async() => {
        try{
            if(selectedReservation?.id){
                await deletePublishedReservation(selectedReservation.id);
                toast.success('Reserva deletada com sucesso!');
                setTimeout(() => {
                    navigate('/hotelier-reservations');
                }, 2000); 
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handleDeletePromotion = async() => {
        try{
            if(selectedReservation?.id){
                await deletePromotion(selectedReservation.id);
                toast.success('Promoção deletada com sucesso!');
                setUpdateFlag(!updateFlag); // Troca o valor do updateFlag para atualizar os dados
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Navega para a página anterior
    };
    

    const price = +reservationData.price;
    const new_price = +reservationData.new_price;

    return(<Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <NavBar/>
            <Box ml="20px">
            <Flex flex="1" bg="#191919" justifyContent="center" alignItems="center" position="relative">
                <Box position="absolute" left="130px" top="95px" width="550px">
                    <Box position="relative" width="100%" height="320px" bg="#6A0572" zIndex="1" backgroundSize="cover" backgroundPosition="center" style={{backgroundImage: `url(http://localhost:5001${reservationData.imageUrl})`}}/>
                    <Box position="absolute" width="100%" height="320px" bg="rgba(255, 255, 255, 0.1)" top="10px" left="10px" zIndex="0" />
                    <Text mt="20px" color="#EAEAEA" fontSize="2xl" fontWeight="bold" textAlign="center">
                        {reservationData.name}
                    </Text>
                    <Flex justify="center">
                        {reservationData.promotion_id ? (
                                <Text color="#EAEAEA" fontSize="xl" textAlign="center">
                                    R$ {new_price.toFixed(2)} a diária <Badge data-cy="promotion" id="promotion" variant="solid" fontSize="15px" colorScheme="red" >({promotionData.discount}% OFF)</Badge>
                                </Text>
                            ) : (
                                <Text color="#EAEAEA" fontSize="xl" textAlign="center">
                                    R$ {price.toFixed(2)} a diária 
                                </Text>
                            )}
                            <Divider orientation="vertical" borderColor="#EAEAEA" height="20px" m="6px" />
                            <Icon as={FaPerson} color="#EAEAEA" m="6px" boxSize="20px"/>
                            <Text color="#EAEAEA" fontSize="20px" mb="2px">{`${reservationData.people} Pessoas`}</Text>
                    </Flex>
                    <HStack mt="10px" justify="center" spacing={4}>
                        {reservationData.wifi &&  <ServicesComponent value="Wi-Fi" icon={FaWifi}/>}
                        {reservationData.room_service &&  <ServicesComponent value="Serviço de Quarto" icon={FaConciergeBell}/>}
                        {reservationData.breakfast &&  <ServicesComponent value="Café da Manhã" icon={FaCoffee}/>}
                        {reservationData.airConditioner &&  <ServicesComponent value="Ar-condicionado" icon={FaSnowflake}/>}
                        {reservationData.parking &&  <ServicesComponent value="Estacionamento" icon={FaCar}/>}
                    </HStack>
                </Box>
                    <Flex flexDirection={'column'} gap="18px" position="relative" left="15%" mt="100px">
                        <Box mb="25px">
                            <DataComponent value={`${reservationData.rooms} Quartos`} icon={MdOutlineBedroomChild}/>
                        </Box>
                        <ButtonComponent dataCy="update" id="updateReservationButton" label="Editar Reserva" icon = {<EditIcon/>} onClick={() => navigate(`/reservationUpdate`)}/>
                        <ButtonDeleteComponent dataCy="delete" id="deleteReservationButton" label="Deletar Reserva" icon = {<DeleteIcon/>} onClick={handleDeleteReservation}/>
                        <ButtonComponent dataCy="cadastrar-promocao" id="cadastrar-promocao" label="Cadastrar Promoção" icon={<AddIcon/>} onClick={() => navigate(`/promotions?action=createSingle`)}/>
                        <ButtonComponent dataCy="editar-promocao" id="editar-promocao" label="Editar Promoção" icon={<EditIcon />} onClick={() => navigate(`/promotions?action=update`)}/>
                        <ButtonDeleteComponent dataCy="deletar-promocao" id="deletar-promocao" label="Deletar Promoção" icon={<DeleteIcon />} onClick={handleDeletePromotion}/>
                        <ButtonComponent dataCy="voltar" id="goBackButton" label="Voltar" icon = {<ArrowBackIcon />} onClick={handleGoBack}/>
                    </Flex>    
                </Flex>
                <TeiaImg />
            </Box>
            <ToastContainer position='top-right' theme='dark' autoClose={2000}/>
    </Box>)
}

const ButtonComponent = ({id, label, icon, onClick, dataCy}) => {
    return (
        <Button data-cy={dataCy} id={id} border="1px solid white" borderRadius="4px" color="#eaeaea" bg="#6A0572" w="100%" p="21px" fontSize="17px" leftIcon={icon} onClick={onClick} _hover={{color: "#191919", bg: "#eaeaea"}}>
            {label}
        </Button>
            
    )
}

const ButtonDeleteComponent = ({id, label, icon, onClick, dataCy}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    return (
        <Box>
            <Button data-cy={dataCy} id={id} border="1px solid white" borderRadius="4px" color="#eaeaea" bg="#6A0572" w="100%" p="21px" fontSize="17px" leftIcon={icon} onClick={onOpen} _hover={{color: "#191919", bg: "#eaeaea"}}>
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
                    {label === "Deletar Reserva" ? "Esta ação não pode ser desfeita e a reserva será removida permanentemente do sistema." : "Esta ação não pode ser desfeita e a promoção será removida permanentemente do sistema."}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                        Não
                        </Button>
                        <Button data-cy="yes-button" id="yes-button" ml={3} onClick={() => {
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

const ServicesComponent = ({icon, value}) => {
    return (
        <HStack spacing={1}>
            <Icon as={icon} color="#EAEAEA" />
            <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                {value}
            </Text>
        </HStack>
    )
}

const DataComponent = ({icon, value}) => {
    return (
        <HStack spacing={1}>
            <Icon as={icon} color="#EAEAEA" boxSize="30px"/>
            <Text color="#EAEAEA" fontSize="20px" whiteSpace="nowrap">
                {value}
            </Text>
        </HStack>
    )
}



