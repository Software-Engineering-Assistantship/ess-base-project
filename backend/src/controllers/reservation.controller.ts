import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';

export const buscarAcomodacoes = async (req: Request, res: Response) => {
  const { destino, data_ida, data_volta, num_pessoas} = req.query;

  if (!destino) {
    res.status(400).json({ error: 'O destino é obrigatório.' });
  }

let checkIn: Date;
if (data_ida) {
  checkIn = new Date(data_ida as string);
} else {
  checkIn = addDays(new Date(), 1);
}

let checkOut: Date;
if (data_volta) {
  checkOut = new Date(data_volta as string);
} else {
  checkOut = addDays(new Date(), 2);
}

let qntHospedes: number;
if(num_pessoas){
  qntHospedes = parseInt(num_pessoas as string);
}
else{
  qntHospedes = 2;
}

 // Agora verificamos corretamente se `checkIn` e `checkOut` foram atribuídos corretamente
if (!checkIn || isNaN(checkIn.getTime())) {
  return res.status(400).json({ message: 'Data de ida inválida' });
}
if (!checkOut || isNaN(checkOut.getTime())) {
  return res.status(400).json({ message: 'Data de volta inválida' });
}
  if(checkIn >= checkOut){
    res.status(400).json({ message: 'Data de ida maior que data de volta' });
  }
  // Chama o Service para buscar as acomodações
    const roomsAdequados = await RoomService.buscarAcomodacoes(destino as string, checkIn, checkOut, qntHospedes);

  console.log('Destino:', destino);
  console.log('Data de ida:', checkIn);
  console.log('Data de volta:', checkOut);
  console.log('Numero de Pessoas:', qntHospedes);

  console.table(roomsAdequados);
  res.json(roomsAdequados);
};


