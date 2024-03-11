'use client';
import React, { useState } from 'react';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useRouter } from 'next/navigation'

// Props das promoções
interface SaleProps {
  category: string;
  discout: string;
  end_date: string;
}


export default function PromotionComponent (props: SaleProps) {
  return (
    <div className="flex flex-col items-center p-0">
        <div className='flex flex-col m-10' style={{width: 450, height: 20}}>
            <div className='flex flex-col items-end'>
              <button className='bg-rose-700 rounded-md'>
                <Image
                  src=""
                  alt="Icone de lixeira"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex flex-row items-start">
                    <h1 className="text-36 font-bold pr-4 ">{props.category}</h1>
                    <h2 className="text-32">{props.discout}</h2>
                </div>
                <h2 className="text-rose-700">Data de expiração: {props.end_date}</h2>
            </div>
        </div>
    </div>
  );
}

//Modal de Promoção
export function ModalPromotion() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className='bg-rose-700 h-50 w-105 rounded-md'
      >
        <Image
          src=""
          alt="Icone de lixeira"
          width={24}
          height={24}
        />
      </button>
      {showModal ? (
        <>
          <div
            className='fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50'
            onClick={() => setShowModal(false)}
          ></div>
          <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-10 rounded-md'>
            <div className='flex flex-col itens-end' style={{width: 70, height: 5}}>
              <button
                onClick={() => console.log('Adicionar promoção')}
                className='bg-rose-700 text-white p-2 rounded-md'
              >
                +
              </button>
            </div>
            <div className='flex flex-col items-center'>
              <PromotionComponent category="Eletrônicos" discout="10%" end_date="10/10/2021" />
              <PromotionComponent category="Eletrônicos" discout="10%" end_date="10/10/2021" />
              <PromotionComponent category="Eletrônicos" discout="10%" end_date="10/10/2021" />
            </div>  
          </div>
        </>
      ) : null}


    </div>
    );
}