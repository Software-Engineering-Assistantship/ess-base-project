import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Checkbox,
    Box,
    Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { RiImageAddFill } from 'react-icons/ri';
import { BottomLeftTopRightImages } from '../../../../shared/components/spider-images';
import { getPublishedReservationById, updatePublishedReservation, uploadImage } from '../../services';
import { PublishedReservationModel } from '../../models/publishedReservation';
import { useReservationContext } from '../../context';

export const PublishedReservationUpdate = () => {
    const [reservationData, setReservationData] = useState<PublishedReservationModel>({} as PublishedReservationModel);
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState('');
    const [people, setPeople] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState('');
    const [wifi, setWifi] = useState(false);
    const [airConditioner, setAirConditioner] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [parking, setParking] = useState(false);
    const [roomService, setRoomService] = useState(false);
    const {selectedReservation} = useReservationContext();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imagePreview = file ? URL.createObjectURL(file) : '';
        setImageUrl(imagePreview);
        setImage(file);
    };

    const handleDataChange = (setFunction) => (event) => {
        setFunction(event.target.value);
    };

    const handleCheckboxChange = (setFunction) => (event) => {
        setFunction(event.target.checked);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservationData = async () => {
            if (selectedReservation?.id) {
                try {
                    const response = await getPublishedReservationById(selectedReservation.id);
                    setReservationData(response);
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };
        fetchReservationData();
    }, [selectedReservation?.id]);

    useEffect(() => {
        if (reservationData) {
            setWifi(reservationData.wifi || false);
            setAirConditioner(reservationData.airConditioner || false);
            setBreakfast(reservationData.breakfast || false);
            setParking(reservationData.parking || false);
            setRoomService(reservationData.room_service || false);
            if (reservationData.imageUrl) {
                setImageUrl(`http://localhost:5001${reservationData.imageUrl}`);
            }
        }
    }, [reservationData]);

    const handlePublicReservation = async () => {
        if ((name === reservationData.name || !name) && (parseInt(rooms, 10) === reservationData.rooms || !rooms) && (reservationData.people === parseInt(people, 10) || !people)
            && reservationData.wifi === wifi && reservationData.breakfast === breakfast && reservationData.airConditioner === airConditioner 
            && reservationData.parking === parking && reservationData.room_service === roomService && (reservationData.price === parseFloat(price) || !price) && !image) {
            toast.warning('Nenhum campo atualizado!');
        } else {
            try {
                if(selectedReservation?.id){
                        await updatePublishedReservation(
                        selectedReservation.id,
                        name !== '' ? name : reservationData.name,
                        rooms !== '' ? parseInt(rooms, 10) : reservationData.rooms,
                        people !== '' ? parseInt(people, 10) : reservationData.people,
                        wifi,
                        breakfast,
                        airConditioner,
                        parking,
                        roomService,
                        price !== '' ? parseFloat(price) : reservationData.price
                    );
                    if(image){
                        const formData = new FormData();
                        formData.append('image', image);
                        await uploadImage(selectedReservation?.id, formData);
                    } 
                    toast.success('Reserva atualizada com sucesso!');
                    setTimeout(() => {
                        navigate('/hotelier-reservations');
                    }, 3000);
                }
            } catch (error) {
                const err = error as { response: { data: { message: string } } };
                toast.error(`${err.response.data.message}`);
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navega para a página anterior
    };
    
    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column" justifyContent="space-between">
            <NavBar />
            <BottomLeftTopRightImages/>
            <Box>
                <Box border="2px solid #eaeaea" borderRadius="5px" p="20px" textAlign="center" mx="auto" maxW="650px" position="relative">
                    <Box fontSize="30px" color="#eaeaea" fontFamily="Trancinfont" position="absolute" top="-35px" bg="#191919" px="10px" mx="auto">
                        Dados da reserva
                    </Box>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Box
                                width="300px"
                                aspectRatio="16/9"
                                bg="#6A0572"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="#eaeaea"
                                border="1px dashed #eaeaea"
                                cursor="pointer"
                                position="relative"
                                _hover={{ background: "#6A0589" }}
                                style={{
                                    backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {!imageUrl && (
                                    <Box display={image ? "none" : "inline"}>
                                        <Icon as={RiImageAddFill} color="#eaeaea" boxSize="50px" />
                                    </Box>
                                )}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    opacity="0"
                                    position="absolute"
                                    width="300px"
                                    height="100%"
                                    cursor="pointer"
                                    aspectRatio="16/9"
                                ></Input>
                            </Box>

                            <Flex flexDirection="column" mt="25px" gap="5px">
                                <CheckboxComponent value="Wi-fi" checked={wifi} onChange={handleCheckboxChange(setWifi)} />
                                <CheckboxComponent value="Ar-Condicionado" checked={airConditioner} onChange={handleCheckboxChange(setAirConditioner)} />
                                <CheckboxComponent value="Café da Manhã" checked={breakfast} onChange={handleCheckboxChange(setBreakfast)} />
                                <CheckboxComponent value="Estacionamento" checked={parking} onChange={handleCheckboxChange(setParking)} />
                                <CheckboxComponent value="Serviço de Quarto" checked={roomService} onChange={handleCheckboxChange(setRoomService)} />
                            </Flex>
                        </Box>
                        <Box>
                            <LabelComponent value="Nome" type="text" input={name} onChange={handleDataChange(setName)} placeholder={reservationData?.name || ''} />
                            <LabelComponent value="Quantidade de Quartos" type="number" input={rooms} onChange={handleDataChange(setRooms)} placeholder={reservationData?.rooms || ''} />
                            <LabelComponent value="Quantidade de Pessoas" type="number" input={people} onChange={handleDataChange(setPeople)} placeholder={reservationData?.people || ''} />
                            <LabelComponent value="Valor" type="number" input={price} onChange={handleDataChange(setPrice)} placeholder={reservationData?.price || ''} />
                        </Box>
                    </Flex>
                    <Flex justify="space-between" mt="15px">
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            onClick={handleGoBack}
                            border="1px solid white"
                            borderRadius="4px"
                            color="white"
                            bg="transparent"
                            maxW="160px"
                            px="10px"
                            py="10px"
                            fontSize="16px"
                            flex="1"
                            ml="0"
                            mr="10px"
                            _hover={{ bg: "white", color: "#191919" }}
                            fontWeight="none"
                        >
                            Voltar
                        </Button>
                        <Button
                            rightIcon={<CheckIcon />}
                            onClick={handlePublicReservation}
                            border="1px solid white"
                            borderRadius="4px"
                            color="white"
                            bg="transparent"
                            maxW="160px"
                            px="10px"
                            py="10px"
                            fontSize="16px"
                            flex="1"
                            ml="10px"
                            mr="0"
                            _hover={{ bg: "white", color: "#191919" }}
                            fontWeight="none"
                        >
                            Confirmar
                        </Button>
                    </Flex>
                </Box>
            </Box>
            <ToastContainer position="top-right" theme='dark' autoClose={3000} />
        </Box>
    );
};

export const CheckboxComponent = ({ value, checked, onChange }) => {
    return (
        <Checkbox color={'#eaeaea'} colorScheme='purple' isChecked={checked} onChange={onChange}>
            {value}
        </Checkbox>
    );
};

export const LabelComponent = ({ value, type, input, onChange, placeholder }) => {
    return (
        <FormControl mb="15px">
            <FormLabel color="#eaeaea" mb="8px">{value}</FormLabel>
            <Input isRequired color="#eaeaea" type={type} min={0} value={input} onChange={onChange} bg="#6A0572" placeholder={placeholder} _placeholder={{color: "#eaeaea"}}/>
        </FormControl>
    );
};
