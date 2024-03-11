'use client'
import React, { useState } from 'react';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useRouter } from 'next/navigation'
import CuponsComponent from '@/components/cupons/cupons';

export default function Home() {
  const [showDiv, setShowDiv] = useState(false); // Estado para controlar a visibilidade da div branca
  const [cpfValue, setCpfValue] = useState(""); // Estado para armazenar o valor do CPF

  // Função para alternar a visibilidade da div branca
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  // Função para lidar com a mudança no valor do input do CPF
  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpfValue(event.target.value);
  };
  const router  = useRouter();
  const handleButtonClick = () => {
    router.push("/newDeliveryPerson"); 
  };
  return (
    <div style={{
      backgroundColor: '#FCF6F6',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <text style={{
        color: '#9B1127',
        fontSize: '40px',
        fontFamily: 'Red Hat Display, sans-serif'
      }}>Cupons</text>
      <div style={{
          backgroundColor: '#9B1127',
          width: '100px',
          height: '50px', // Ajuste de altura para igualar com a altura da div de CPF
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={handleButtonClick}>
          <text style={{color:'white', fontSize:'40px', marginBottom:'10px'}}>+</text>
        </div>
        <CuponsComponent name="Nome" discout="Desconto" end_date="Data de expiração" />
        <CuponsComponent name="Nome" discout="Desconto" end_date="Data de expiração" />
        <CuponsComponent name="Nome" discout="Desconto" end_date="Data de expiração" />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
      }}>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '20px', 
      }}>
        
      </div>
    </div>
  );
}