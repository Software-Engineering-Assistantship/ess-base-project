"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";
import AuthContainer from "@/components/AuthContainer";
import AuthFooter from "@/components/AuthFooter";

interface LoginProps {
    onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
      //onLoginSuccess();
      
      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          // Login bem-sucedido
          router.push("/");
        } else {
          // Login falhou
          const errorData = await response.json();
          setError(errorData.error || "Falha no login");
        }
      } catch (error) {
        setError("Erro de rede ou servidor");
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <AuthContainer>
          <div className="flex flex-col items-center space-y-4">
            <Logo />
            {error && <p className="text-red-500">{error}</p>}
            <Input type="text" 
            placeholder="Usuário/Email" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            />
            <Input type="password" 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
          <AuthFooter />
        </AuthContainer>
      </div>
    );
  }