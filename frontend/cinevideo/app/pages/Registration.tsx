"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import AuthFooter from "@/components/AuthFooter";

export default function Registration() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          birth_date,
          gender,
          photo,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        setMessage("Cadastro realizado com sucesso");
        setMessageColor("white");
        router.push("/"); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Falha no cadastro");
        setMessageColor("white");
      }
    } catch (error) {
      setMessage("Erro de rede ou servidor");
      setMessageColor("white");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AuthContainer>
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          {message && <p className={`text-${messageColor}-500`}>{message}</p>}
          <Input
            type="text"
            placeholder="Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Data de Nascimento"
            value={birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Gênero"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Foto (URL)"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleRegistration}>Cadastrar</Button>
        </div>
        <AuthFooter />
      </AuthContainer>
    </div>
  );
}