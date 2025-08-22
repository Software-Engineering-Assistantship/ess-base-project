import { useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import BackButton from "@/components/BackButton";
import ProfilePicture from "@/components/ProfilePicture";

export default function ProfileInformation() {
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AuthContainer>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-between w-full">
            <BackButton />
            <Logo />
          </div>
          <Input type="text" placeholder="Nome completo" />
          <Input type="text" placeholder="Usuário/Email" />
          <Input type="date" placeholder="Data de nascimento" />
          <Input type="text" placeholder="Gênero" />
          <Input type="password" placeholder="Senha" />
          <ProfilePicture imageUrl="/images/profile.jpg" /> {/* Substitua pelo caminho da imagem */}
          <div className="flex space-x-4">
            <Button onClick={() => setIsChangePasswordPopupOpen(true)}>Alterar senha</Button>
            <Button>Alterar dados</Button>
            <Button onClick={() => setIsDeleteAccountPopupOpen(true)}>Excluir conta</Button>
          </div>
        </div>
      </AuthContainer>
    </div>
  );
}