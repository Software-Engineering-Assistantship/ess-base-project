"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, List, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Lista = {
  id: string;
  titulo: string;
};

type OptionItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  link?: string;
};

export default function ListPage() {
  const [listas, setListas] = useState<Lista[]>([]);

  useEffect(() => {
    const fetchListas = async () => {
      const mockListas: Lista[] = [
        { id: "1", titulo: "Favoritos" },
        { id: "2", titulo: "Assistir Depois" },
      ];
      setListas(mockListas);
    };

    fetchListas();
  }, []);

  const videoLists: OptionItem[] = listas.map((lista) => ({
    id: lista.id,
    title: lista.titulo,
    icon: <List size={64} />,
    link: `/lista/${lista.id}`,
  }));

  const newListOption: OptionItem = {
    id: "new",
    title: "Nova Lista",
    icon: <Plus size={64} />,
    link: "/newList",
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-red-600">CINevideo</h1>
      </header>

      <div className="grid grid-cols-3 gap-6 max-w-3xl">
        {videoLists.map((option) => (
          <Link key={option.id} href={option.link || "#"} className="flex flex-col items-center">
            <Card className="w-[180px] h-[180px] flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors">
              <CardContent className="flex items-center justify-center h-full p-0">
                {option.icon}
              </CardContent>
            </Card>
            <span className="mt-2 text-center font-medium">{option.title}</span>
          </Link>
        ))}

        <Link key={newListOption.id} href={newListOption.link || "#"} className="flex flex-col items-center">
          <Card className="w-[180px] h-[180px] flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors">
            <CardContent className="flex items-center justify-center h-full p-0">
              {newListOption.icon}
            </CardContent>
          </Card>
          <span className="mt-2 text-center font-medium">{newListOption.title}</span>
        </Link>
      </div>
    </div>
  );
}