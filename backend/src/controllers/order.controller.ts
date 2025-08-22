import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';
import { addDays, parseISO } from 'date-fns';

export const ordenarAcomodacoes = async (req: Request, res: Response) => {
    const {price, avaliacao, stars} = req.query;

    const { roomsAdequados } = req.body; // Lista de quartos
    const {quartosFiltrados} = req.body; // Lista de quartos já filtrados

    if (!roomsAdequados || !Array.isArray(roomsAdequados)) {
        return res.status(400).json({ message: 'Lista de quartos adequada não foi fornecida corretamente.' });
    }
    if (!quartosFiltrados || !Array.isArray(roomsAdequados)) {
        return res.status(400).json({ message: 'Lista de quartos filtrados não foi fornecida corretamente.' });
    }

    let quartosOrdenados = [...quartosFiltrados];

    if (price) {
        // Ordena por preço (menor para maior)
        quartosOrdenados.sort((a, b) => a.preco - b.preco);
    } else if (avaliacao) {
        // Ordena por avaliação (maior para menor)
        quartosOrdenados.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (stars) {
        // Ordena por estrelas (maior para menor)
        quartosOrdenados.sort((a, b) => b.stars - a.stars);
    }

    console.log("Lista de quartos ordenados:");
    console.table(quartosOrdenados);
    res.json(quartosOrdenados);
};