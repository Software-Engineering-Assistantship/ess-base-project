import { GithubIcon, InstagramIcon, MessageCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center space-y-4 px-12 py-4 bg-rose-700">
      <p className="text-white text-2xl font-bold">Aury</p>
      <Separator />
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="col-span-2">
          <p className="text-white">
            Grupo 5  CNPJ: 00.000.000/0000-00 Av. Jornalista Aníbal Fernandes, s/n,
          </p>
          <p className="text-white">
            Cidade Universitária - Recife, PE, 50740-560, Brasil
          </p>
        </div>
        <div className="flex justify-end items-center space-x-4 col-span-1">
          <Link href="https://github.com/liviabion/ess-project" passHref>
            <GithubIcon size={32} color="white" />
          </Link>
          <Link href="https://github.com/liviabion/ess-project" passHref>
            <InstagramIcon size={32} color="white" />
          </Link>
          <Link href="https://github.com/liviabion/ess-project" passHref>
            <MessageCircle size={32} color="white" />
          </Link>
        </div>
      </div>
    </footer>
  )
}