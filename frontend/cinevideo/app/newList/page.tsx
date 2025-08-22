"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewListPage() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/lists"); 
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="mb-10">
        <Link href="/lists">
          <Button variant="outline" className="mb-4">
            Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-red-600">CINevideo</h1>
      </header>

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-200 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Nova lista:</h2>

            <Input
              className="w-full mb-8 bg-white"
              placeholder="Digite o nome da nova lista"
            />

            <div className="flex justify-end">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8"
                onClick={handleConfirm} // Adicione o manipulador de eventos
              >
                Confirmar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}