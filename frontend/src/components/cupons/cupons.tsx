'use client';
import React, { useState } from 'react';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useRouter } from 'next/navigation'


interface CuponsProps {
  name: string;
  discout: string;
  end_date: string;
}


export default function CuponsComponent (props: CuponsProps) {
  return (
    <div className="flex flex-col items-center p-0">
        <div className='flex flex-col m-10' style={{width: 450, height: 20}}>
            <div className="flex flex-col items-start">
                <div className="flex flex-row items-start">
                    <h1 className="text-36 font-bold pr-4 ">{props.name}</h1>
                    <h2 className="text-32">{props.discout}</h2>
                </div>
                <h2 className="text-rose-700">Data de expiração: {props.end_date}</h2>
            </div>
        </div>
    </div>
  );
}