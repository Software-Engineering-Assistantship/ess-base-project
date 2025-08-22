import React, { createContext, useState, useContext } from 'react';

interface ReservationData {
  clientId: null | number;
  publishedReservationId: null | string | undefined;
  checkInDate: null | Date;
  checkOutDate: null | Date;
  numRooms: number;
  numAdults: number;
  numChildren: number;
  paymentMethodName: string;
}

interface ReservationContextProps {
  reservationData: ReservationData;
  setReservationData: React.Dispatch<React.SetStateAction<ReservationData>>;
}

const initialReservationData: ReservationData = {
  clientId: null,
  publishedReservationId: null,
  checkInDate: null,
  checkOutDate: null,
  numRooms: 1,
  numAdults: 1,
  numChildren: 0,
  paymentMethodName: ''
};

const ReservationContext = createContext<ReservationContextProps>({
  reservationData: initialReservationData,
  setReservationData: () => {}
});

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservationData, setReservationData] = useState<ReservationData>(initialReservationData);

  return (
    <ReservationContext.Provider value={{ reservationData, setReservationData }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
