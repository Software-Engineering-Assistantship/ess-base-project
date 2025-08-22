"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import AuthFooter from "@/components/AuthFooter";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState(""); // Nova variável de estado para a cor

    const handleLogin = async () => {  
      
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: username, password: password}),
        });
  
        if (response.ok) {
          // Login bem-sucedido
          router.push("/homepage");
        } else {
          // Login falhou
          const errorData = await response.json();
          setMessage((errorData.error || "Falha no login"));
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
              placeholder="Usuário/Email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
          <AuthFooter />
        </AuthContainer>
      </div>
    );
  }