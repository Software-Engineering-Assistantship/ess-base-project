import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPublishedReservations, ISearch } from "../../search/models";
import { getPromotionById, getPublishedReservationsByFilters, getRatingById } from "../services";
import { toast } from "react-toastify";
import { PromotionModel } from "../../Promotion/models/promotion";
import { ReservationCard } from "../../../shared/components/reservation-card";


export const SearchResult = () => {
    const [queryParams] = useSearchParams();
    const [search, setSearch] = useState<ISearch>();
    const [reservations, setReservations] = useState<IPublishedReservations[]>([]);
    const [promotion, setPromotion] = useState<PromotionModel>({} as PromotionModel);

    useEffect(() => {

        const handleSearch = async () => {
            const city = queryParams.get("city");
            const checkin = queryParams.get("checkin");
            const checkout = queryParams.get("checkout");
            const num_adults = queryParams.get("num_adults");
            const num_children = queryParams.get("num_children");
            const num_rooms = queryParams.get("num_rooms");
    
            if(!city || !checkin || !checkout || !num_adults || !num_children || !num_rooms){
                return;
            }

            setSearch({
                city: city,            
                checkin: checkin,
                checkout: checkout,
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
                num_rooms: parseInt(num_rooms)
            })
        }

        handleSearch();
    }, []);

    const handlePromotion = async (reservation_id: number) => {
        try {
            const data = await getPromotionById(reservation_id);
            const discount = data.discount ?? 0;
            setPromotion((prevPromotions) => ({
                ...prevPromotions,
                [reservation_id]: discount,
            }));
        } catch (error: any) {
            console.error('Erro ao obter promoção:', error.response ? error.response : error);
        }
    };

    const handleRating = async (reservation_id: number) => {
        let rating = 0;
        let num = 0;
        try {
            const ratings = await getRatingById(reservation_id);

            ratings.forEach((rate) => {
                rating += rate.rating;
                num++;
            })

            if(num > 0){
                return rating / num;
            }        
        } catch (error) {
            console.error('Erro ao obter promoção:', error);
        } 

        return 0;
    }

    const calculateData = async (reservas: IPublishedReservations[]) => {

        let newReservas = Promise.all(reservas.map(async (reserva) => {
            handlePromotion(reserva.id);

            reserva.rating = await handleRating(reserva.id);
            return reserva;
        })
)

        return newReservas;
    }

    useEffect(() => {
        let reservas = reservations.map((reserva) => {
            let promocao = promotion[reserva.id];
            if(promocao){
                reserva.new_price = reserva.price * (1 - promocao / 100);
            }
            console.log(promocao)

            return reserva;
        })

        setReservations(reservas);
    }, [promotion])

    useEffect(() => {
        const fetchSearch = async () => {
            if(search){
                let response;
                try{
                  response = await getPublishedReservationsByFilters(search);
                  
                } catch (error ){
                  const err = error as any;
                  if(err.response.status == 400){
                      toast.warning('Um erro ocorreu')
                  }
        
                  return;
                }

                // console.log(response);
                
                let reservationsFinal = await calculateData(response);

                // console.log(promotion)

                setReservations(reservationsFinal);


            }
        }
        fetchSearch()
    }, [search])

    return (
    <Box mt={12} p={0} minH="500px" position="relative">
        <Box position="relative" zIndex="1">
        <Text fontSize="6xl" m={3} fontFamily="trancinfont" letterSpacing={"-0.07em"}>
            resulTados de busca
        </Text>
        <Flex flexWrap="wrap" gap="75px" mt="30px"  mx={3} fontFamily="Inter">
        {reservations.length == 0 && <Box fontFamily="Inter" mx={3} fontSize="xl" id="reservenotfound">Nenhuma reserva foi encontrada</Box>}
        {reservations.map(reservation => (
            <ReservationCard key={reservation.id} reservation={reservation} promotionValue={promotion[reservation.id]} />
        ))}
        </Flex>
        </Box>
    </Box>
    )
}