import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';

class RoomService {
  async buscarAcomodacoes(destino: string, checkIn: Date, checkOut: Date, qntHospedes: number) {
    const roomRepository = new RoomRepository();
  const rooms = await roomRepository.getRooms(); // busca todas as acomodacoes disponiveis

  const reservationRepository = new ReservationRepository();
  const reservations = await reservationRepository.getReservations(); // busca todas as reservas

  const roomsAvailable = rooms.filter((room) => {
    const quartoComReservas = reservations.some(reservation => reservation.room_id === room.id); // verifica se o id da reserva é o mesmo do quarto
    if(!quartoComReservas){ // quarto com 0 reservas ja entra direto na lista
      return true;
    }
    return !reservations.some(reservation =>
      reservation.room_id === room.id &&
      new Date(reservation.check_in) <= new Date(checkOut) &&
      new Date(reservation.check_out) >= new Date(checkIn)
    ); // retornou quartos com a data livre
  });

  const roomsAvailableDestino = roomsAvailable.filter(room => room.local === destino);

  if (roomsAvailableDestino.length === 0) {
    throw new Error('Não há acomodações disponíveis no destino e nas datas pesquisadas.');
  }

  // Quartos adequados para a quantidade de hospedes e destino
  const roomsAdequados = roomsAvailable.filter(room => room.local === destino && room.capacity >= qntHospedes);

  if (roomsAdequados.length === 0) {
    throw new Error('Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente.');
  }
  // Ordena os quartos do menor preço para o maior
  roomsAdequados.sort((a, b) => a.price - b.price);

  return roomsAdequados;
}
}
export default new RoomService();