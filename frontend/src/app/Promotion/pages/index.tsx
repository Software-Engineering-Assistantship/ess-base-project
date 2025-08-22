import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FormControl, 
  FormLabel,
  Button, 
  Flex, 
  Select, 
  Text, 
  Box,
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import aranhaImg from './aranha.png';
import { useLocation, useNavigate } from 'react-router-dom';;
import { PromotionType } from '../models/promotion';
import { LabelComponent } from '../../PublishedReservation/pages/Register';
import { NavBar } from '../../../shared/components/nav-bar';
import { BottomLeftTopRightImages } from '../../../shared/components/spider-images';
import { createPromotion, createPromotionAll, updatePromotion } from '../services';
import { getPublishedReservationById } from '../../PublishedReservation/services';
import { PublishedReservationModel } from '../../PublishedReservation/models/publishedReservation';
import { useReservationContext } from '../../PublishedReservation/context';
import { useHotelierData } from '../../auth/hooks/useUserData';

export const Promotion = () => {
    //const { reservation_id } = useParams();
    const [reservationData, setReservationData] = useState<PublishedReservationModel>({} as PublishedReservationModel);
    const { selectedReservation } = useReservationContext();
    const [promoType, setPromoType] = useState('');
    const [discount, setDiscount] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [actionType, setActionType] = useState('');
    const { data } = useHotelierData();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const action = params.get('action') ?? '';
        setActionType(action);

        const fetchReservationData = async () => {
            if(selectedReservation?.id){
                try {
                    const response = await getPublishedReservationById(selectedReservation.id);
                    setReservationData(response);
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };
        fetchReservationData();
    },[]);

    const handlePromoTypeChange = (event) => {
        setPromoType(event.target.value);
    };

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
    };

    const handleNumRoomsChange = (event) => {
        setNumRooms(event.target.value);
    };


    const handleConfirmRegister = async() => {
        if(discount === '' || promoType === undefined){
            toast.warning('Preencha todos os campos!');
        }else if(promoType === 'limiteQuarto' && numRooms === ''){
            toast.warning('Preencha todos os campos!');
        }
        else if(+discount < 5 || +discount > 60) {
            toast.warning('O desconto deve estar entre 5% e 60%');
        }else{
            try{
                if (actionType === 'createSingle') {
                    if(promoType === 'ilimitada'){
                        await createPromotion(selectedReservation!.id, { discount: parseInt(discount, 10), type: PromotionType.ILIMITADA });
                    }else{
                        await createPromotion(selectedReservation!.id, { discount: parseInt(discount, 10), type: PromotionType.LIMITE_QUARTO, num_rooms: parseInt(numRooms, 10)} );
                    }
                    toast.success('Promoção cadastrada com sucesso!');
                }else if (actionType === 'update') {
                    if(promoType === 'ilimitada'){
                        await updatePromotion(selectedReservation!.id, { discount: parseInt(discount, 10), type: PromotionType.ILIMITADA});
                    }else{
                        await updatePromotion(selectedReservation!.id, {discount: parseInt(discount, 10), type: PromotionType.LIMITE_QUARTO, num_rooms: parseInt(numRooms, 10)});
                    }
                    toast.success('Promoção atualizada com sucesso!');
                }else if (actionType === 'createAll') {
                    await createPromotionAll(Number(data?.id), {discount: parseInt(discount, 10), type: PromotionType.ILIMITADA} );
                    toast.success('Promoção cadastrada com sucesso!');
                }
                setTimeout(() => {
                    navigate('/hotelier-reservations');
                }, 2000); 
            }catch(error){
                const err = error as { response: { data: { message: string } } };
                toast.error(`${err.response.data.message}`);
            }
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Navega para a página anterior
    };
    
    const handlePriceChange = () => {
        const new_price = +reservationData.price * ((1 - (+discount)/100));
        return new_price.toFixed(2);
    }

    const price = +reservationData.price;

    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column" justifyContent="space-between">
            <NavBar/>
            <BottomLeftTopRightImages/>
            <Box as="main" mx="auto" width="90%" maxWidth="600px">
            <Box border="2px solid #eaeaea" borderRadius="5px" p="20px" textAlign="center" mx="auto" maxW="360px" position="relative">
                    <Text fontSize="30px" fontFamily="Trancinfont" color="#eaeaea" position="absolute" top="-25px" bg="#191919" px="10px" mx="auto" left="20%">
                        Dados da Promoção
                    </Text>
                        <Flex flexDirection="column" mt="20px">
                            <LabelComponent dataCy="desconto" id="desconto" value="Desconto" type="number" input={discount} onChange={handleDiscountChange} placeholder={"%"}/>
                            
                            {(actionType === "createSingle" || actionType === "update") && (
                                <Box>
                                    <FormControl mb="15px">
                                    <FormLabel htmlFor="type" color="white" mb="8px">Promoção</FormLabel>
                                        <Select data-cy="type" id="type" placeholder="" isRequired onChange={handlePromoTypeChange} bg="#6A0572" color="white" borderRadius="4px" border="1px solid #eaeaea">
                                            <option value='nothig' style={{ backgroundColor: '#6A0572' }}></option>
                                            <option value='ilimitada' style={{ backgroundColor: '#6A0572' }}>Ilimitada</option>
                                            <option value='limiteQuarto' style={{ backgroundColor: '#6A0572' }}>Limite de Quarto</option>
                                        </Select>
                                    </FormControl>
                                    {promoType === 'limiteQuarto' && (
                                        <LabelComponent dataCy="quantidade-de-quartos" id="quantidade-de-quartos" value="Quantidade de Quartos" type="number" input={numRooms} onChange={handleNumRoomsChange} placeholder={""}/>
                                    )}
                                    <Box mb="25px">
                                        <FormLabel htmlFor="valor" color="white" mb="8px">Valor</FormLabel>
                                        <Flex justify="center" alignItems="center">
                                            <Text bg="#6A0572" color="white" p="7px" borderRadius="4px" border="1px solid #eaeaea" width="100%">R$ {price.toFixed(2)}</Text>
                                            <Text color="white" fontSize="24px" mx="10px">→</Text>
                                            <Text bg="#6A0572" color="white" p="7px" borderRadius="4px" border="1px solid #eaeaea" width="100%">R$ {handlePriceChange()}</Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            )}
                            <Flex justify="space-between" mt="10px">
                                <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px" flex="1" ml="0" mr="10px" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                                    Voltar
                                </Button>
                                <Button data-cy="confirmar" id="confirmar" rightIcon={<CheckIcon />} onClick={handleConfirmRegister} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px"  flex="1" ml="10px" mr="0" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                                    Confirmar
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
            </Box>
                <ToastContainer position="top-right" theme='dark' autoClose={2000}/>
        </Box>);
    }

export const TeiaImg = () => {
    return (<Box bgImage={`url(${aranhaImg})`} position="absolute" top="90px" left="85%" w="200px" h="350px" bgSize="contain" bgRepeat="no-repeat" />);
}


