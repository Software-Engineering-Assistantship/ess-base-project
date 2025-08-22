import React, { useState, useEffect, ForwardedRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { JustSpider } from "../../components/just-spider";
import { JustNet} from "../../components/just-net";
import {
  Box, Text, Button, Icon, ButtonGroup, Stack, HStack, NumberInput,
  NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  FormControl, FormLabel, Input, InputGroup, InputRightElement
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavBar } from '../../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Step, StepSeparator, Stepper, useSteps } from '@chakra-ui/react';
import Select, { SingleValue } from 'react-select';
import { getReservationById, updateReservation } from '../../services';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { ReserveModel } from '../../models/reserve';
import { useClientData } from "../../../auth/hooks/useUserData";
import { getAllPayMethod } from '../../../payment/services'


interface OptionType {
  value: string;
  label: string;
}

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateInput = React.forwardRef(
  (props: CustomDateInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Icon as={FaCalendarAlt} color="#EAEAEA" />
      </InputRightElement>
      <Input
        bg="#6A0572"
        color="#EAEAEA"
        textAlign="center"
        border="1px solid #EAEAEA"
        fontSize="sm"
        value={props.value}
        onClick={props.onClick}
        ref={ref}
        width="146px"
        height="50px"
        placeholder=""
      />
    </InputGroup>
  ),
);

const steps = [
  { title: 'Dados da Reserva', description: 'Informações sobre a reserva' },
  { title: 'Pagamento', description: 'Detalhes do pagamento' },
];

const EditReservation: React.FC = () => {
  const { reserve_id } = useParams<{ reserve_id: string }>();
  const [reservation, setReservation] = useState<ReserveModel | null>(null);
  const [publishedReservation, setPublishedReservation] = useState<PublishedReservationModel | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [quartos, setQuartos] = useState(1);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const { activeStep, setActiveStep } = useSteps({ index: 0 });
  const [selectedPayment, setSelectedPayment] = useState<SingleValue<OptionType>>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState<OptionType[]>([]);
  const { data } = useClientData();
  
  const client_id = Number(data?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const reservationResponse = await getReservationById(Number(reserve_id));
        setReservation(reservationResponse);

        const publishedReservationResponse = await getPublishedReservationById(reservationResponse.publishedReservationId);
        setPublishedReservation(publishedReservationResponse);
      } catch (error) {
        const err = error as { response: { data: { message: string } } };
        toast.error(`${err.response.data.message}`);
      }
    };

    if (reserve_id && client_id) {
      fetchReservation();
    }
  }, [reserve_id, client_id]);

  useEffect(() => {
    const calculateDays = (startDate: Date | null, endDate: Date | null) => {
      if (!startDate || !endDate) return 0;
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    if (publishedReservation) {
      const days = calculateDays(checkInDate, checkOutDate);
      const price = days * quartos * publishedReservation.new_price;
      setTotalPrice(price);
    }
  }, [checkInDate, checkOutDate, quartos, publishedReservation?.new_price]);

  const handleDataInput = async () => {
    if(!publishedReservation){
      return;
    } 
    if (checkInDate === null || checkOutDate === null) {
      toast.warning('Preencha todos os campos!');
    }
    else if(adultos + 0.5*criancas > publishedReservation.people){
      toast.warning('A capacidade do quarto foi excedida');
    }
    else if(checkInDate >= checkOutDate){
      toast.warning('A data de check-in deve preceder a data de check-out');
    }
    else {
      setActiveStep(1);
    }
  };

  const handleGoBack = async () => {
    setActiveStep(0);
  };

  const handlePayment = async () => {
    if (!selectedPayment || selectedPayment.value === 'nothing') {
      toast.warning("Preencha todos os campos!");
      return;
    }

    try {
      if (publishedReservation && reservation) {
        const checkInDateString = checkInDate?.toISOString().split('T')[0] ?? ''; // Converte a data para string no formato yyyy-mm-dd
        const checkOutDateString = checkOutDate?.toISOString().split('T')[0] ?? '';
        try{          
          await updateReservation(client_id, publishedReservation.id, reservation.id, quartos, checkInDateString, checkOutDateString, adultos, criancas, selectedPayment.value);
          toast.success("Reserva atualizada com sucesso!", {
            autoClose: 3000, // 3000ms = 3 seconds
            onClose: () => {
              navigate(`/my-reservations`);
            },
          });
        }catch(error){
          const err = error as { response: { data: { message: string } } };
          toast.warning(`${err.response.data.message}`);
        }
        //await updateReservation(client_id, publishedReservation.id, reservation.id, quartos, checkInDateString, checkOutDateString, adultos, criancas, selectedPayment.value);
      }
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      toast.warning(`${err.response.data.message}`);
    }
  };

    // const options: OptionType[] = [
    //   { value: 'nothing', label: '' },
    //   { value: '1', label: '1' },
    //   { value: '2', label: '2' },
    //   { value: '3', label: '3' }
    // ];
  
  
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid #EAEAEA',
        color: '#191919',
        backgroundColor: state.isFocused ? '#EAEAEA' : '#FFF',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#EAEAEA'
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: '#6A0572',
        border: '1px solid #EAEAEA',
        color: '#EAEAEA'
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: '#EAEAEA'
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#EAEAEA',
        color: '#191919'
      })
    };  

    useEffect(() => {
      const fetchPaymentMethods = async () => {
        try {
          const payMethods = await getAllPayMethod(Number(data?.id));
          const options = payMethods.map(method => {
            const censoredNumCard = `**** **** **** ${method.numCard.slice(-4)}`;
            return {
              value: method.numCard,
              label: censoredNumCard
            };
          });
          setPaymentOptions(options);
        } catch (error) {
          //const err = error as { response: { data: { message: string } } };
          toast.warning(`Cadastre um método de pagamento!`);
        }
      };
  
      fetchPaymentMethods();
    }, []);
   
    return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box
        flex="1"
        bg="#191919"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <JustSpider/>
        <JustNet/>
        <Stepper index={activeStep}>
          {steps.map((_, index) => (
            <Step key={index}>
              {index === 0 && activeStep === 0 && (
                <Box
                  position="relative"
                  width="400px"
                  height="auto"
                  border="2px solid #EAEAEA"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  left="0px"
                  py="20px"
                  top="0"
                >
                  <Text
                    position="absolute"
                    top="-23px"
                    bg="#191919"
                    px="10px"
                    color="#EAEAEA"
                    fontFamily='Trancinfont'
                    fontSize="30px"
                  >
                    Dados da reserva
                  </Text>
                  <Stack spacing={4} mt="30px" align="center" width="80%">
                    <HStack spacing={6} width="100%" justify="space-between">
                      <FormControl id="checkin" isRequired>
                        <FormLabel color="#EAEAEA">Check-in</FormLabel>
                        <DatePicker
                          selected={checkInDate}
                          onChange={(date) => setCheckInDate(date)}
                          dateFormat="yyyy-MM-dd"
                          customInput={<CustomDateInput />}
                        />
                      </FormControl>
                      <FormControl id="checkout" isRequired>
                        <FormLabel color="#EAEAEA">Check-out</FormLabel>
                        <DatePicker
                          selected={checkOutDate}
                          onChange={(date) => setCheckOutDate(date)}
                          dateFormat="yyyy-MM-dd"
                          customInput={<CustomDateInput />}
                        />
                      </FormControl>
                    </HStack>
                    <FormControl id="quartos" isRequired>
                      <FormLabel color="#EAEAEA">Quantidade de quartos</FormLabel>
                      <NumberInput min={1} defaultValue={1} size="md" value={quartos} onChange={(_, valueAsNumber) => setQuartos(valueAsNumber)}>
                        <NumberInputField
                          bg="#6A0572"
                          color="#EAEAEA"
                          textAlign="center"
                          border="1px solid #EAEAEA"
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color="#EAEAEA" />
                          <NumberDecrementStepper color="#EAEAEA" />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl id="adultos" isRequired>
                      <FormLabel color="#EAEAEA">Quantidade de adultos</FormLabel>
                      <NumberInput min={1} defaultValue={1} size="md" value={adultos} onChange={(_, valueAsNumber) => setAdultos(valueAsNumber)}>
                        <NumberInputField
                          bg="#6A0572"
                          color="#EAEAEA"
                          textAlign="center"
                          border="1px solid #EAEAEA"
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color="#EAEAEA" />
                          <NumberDecrementStepper color="#EAEAEA" />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl id="criancas">
                      <FormLabel color="#EAEAEA">Quantidade de crianças</FormLabel>
                      <NumberInput min={0} defaultValue={0} size="md" value={criancas} onChange={(_, valueAsNumber) => setCriancas(valueAsNumber)}>
                        <NumberInputField
                          bg="#6A0572"
                          color="#EAEAEA"
                          textAlign="center"
                          border="1px solid #EAEAEA"
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color="#EAEAEA" />
                          <NumberDecrementStepper color="#EAEAEA" />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </Stack>
                  <ButtonGroup spacing="6" mt="30px">
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                      leftIcon={<Icon as={FaArrowLeft} />}
                      width="146px"
                      height="50px"
                      onClick={() => navigate(`/see-reservation/${reserve_id}`)}
                    >
                    </Button>
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                      rightIcon={<Icon as={FaArrowRight} />}
                      width="146px"
                      height="50px"
                      onClick={handleDataInput}
                    >
                    </Button>
                  </ButtonGroup>
                </Box>
              )}

              {index === 1 && activeStep === 1 && (
                <Box
                  position="relative"
                  width="400px"
                  height="auto"
                  border="2px solid #EAEAEA"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  left="-20px"
                  py="20px"
                  top="0"
                >
                  <Text
                    position="absolute"
                    top="-23px"
                    bg="#191919"
                    px="10px"
                    color="#EAEAEA"
                    fontFamily='Trancinfont'
                    fontSize="30px"
                  >
                    Pagamento
                  </Text>
                  <Stack spacing={4} mt="30px" align="center" width="80%">
                    <Text color="#EAEAEA" fontSize="2xl" textAlign="center">
                      Valor total: R$ {totalPrice.toFixed(2)}
                    </Text>
                    <FormControl id="paymentMethod" isRequired>
                      <FormLabel color="#EAEAEA">Método de Pagamento</FormLabel>
                      <Select
                        styles={customStyles}
                        options={paymentOptions}
                        placeholder=""
                        onChange={(option) => setSelectedPayment(option)}
                      />
                    </FormControl>
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      width="100%"
                      onClick={() => navigate(`/client/paymentMethods`)}
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                    >
                      Cadastrar método de pagamento
                    </Button>
                  </Stack>
                  <ButtonGroup spacing="6" mt="30px">
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                      leftIcon={<Icon as={FaArrowLeft} />}
                      width="146px"
                      height="50px"
                      onClick={handleGoBack}
                    >
                    </Button>
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#0097B2', color: '#EAEAEA' }}
                      rightIcon={<Icon as={FaCheck} />}
                      width="146px"
                      height="50px"
                      onClick={handlePayment}
                    >
                    </Button>
                  </ButtonGroup>
                </Box>
              )}

              <StepSeparator />
            </Step>
          ))}
      </Stepper>
      </Box>
      <ToastContainer theme="dark"/>
    </Box>


    );
}

export default EditReservation;