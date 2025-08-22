import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react"
import { IPublishedReservations } from "../../app/search/models"
import { StarIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import morcegoImg from '../assets/bat.png'

interface Props{
    reservation: IPublishedReservations;
    promotionValue?: number | null;
}

export const ReservationCard: React.FC<Props> = ({reservation, promotionValue}: Props) => {

    const navigate = useNavigate();

    return (
        <Box key={reservation.id} position="relative" w="250px" h="300px" _hover={{transform: 'translateY(-5px)'}}>
        {reservation.promotion_id && (
            <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="77%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotionValue !== 0 && `${promotionValue}%`}</Box></Flex>
        )}
        <Box position="relative" w="270px" h="300px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => navigate(`/select-reservation/${reservation.id}`)}>
            <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
            <Flex justify="center" align="center">
                <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold" data-cy="reservation_name">{reservation.name}</Box>
                <Spacer />
                <Box color="#eaeaea" textAlign="start">
                    <HStack>
                        <Text fontSize="20px" fontWeight="bold">
                            {reservation.rating}
                        </Text>
                        <StarIcon 
                            height="15px"
                            width="15px"
                        />
                    </HStack>
                </Box>
            </Flex>
            <Flex textAlign="start" fontSize="20px" color="#eaeaea">
                <Text data-cy="reservation_price" mr={2}>
                    {reservation.new_price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                </Text>

                { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" mx="5px" mt="3px">{reservation.price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</Box>} a diária</Flex>
        </Box>
    </Box>
    )
}