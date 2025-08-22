import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PublishedReservationModel } from '../models/publishedReservation';

interface ReservationContextType {
    reservations: PublishedReservationModel[];
    setReservations: React.Dispatch<React.SetStateAction<PublishedReservationModel[]>>;
    selectedReservation: PublishedReservationModel | null;
    setSelectedReservation: React.Dispatch<React.SetStateAction<PublishedReservationModel | null>>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reservations, setReservations] = useState<PublishedReservationModel[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<PublishedReservationModel | null>(null);

    useEffect(() => {
        const storedReservation = localStorage.getItem('selectedReservation');
        if (storedReservation) {
            setSelectedReservation(JSON.parse(storedReservation));
        }
    }, []);

    useEffect(() => {
        if (selectedReservation) {
            localStorage.setItem('selectedReservation', JSON.stringify(selectedReservation));
        }
    }, [selectedReservation]);
    
    return (
        <ReservationContext.Provider value={{ reservations, setReservations, selectedReservation, setSelectedReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (context === undefined) {
        throw new Error('useReservationContext must be used within a ReservationProvider');
    }
    return context;
};
