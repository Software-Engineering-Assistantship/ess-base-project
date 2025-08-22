import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import BackButton from "@/components/BackButton";

export default function Registration() {
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
          <Input type="date" placeholder="Gênero" />
          <Input type="file" placeholder="Foto" />
          <Input type="password" placeholder="Senha" />
          <Input type="password" placeholder="Confirmação de senha" />
          <Button>Cadastrar-se</Button>
        </div>
      </AuthContainer>
    </div>
  );
}