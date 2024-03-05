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
    <div className="flex flex-col items-center">
        <div className=''>
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