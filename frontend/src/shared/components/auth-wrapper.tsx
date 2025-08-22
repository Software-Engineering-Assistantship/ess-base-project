import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { sessionManager } from "../config/session-manager";
import { useToast } from "@chakra-ui/react";

interface AuthWrapperProps {
  children: React.ReactNode;
  allowedUserTypes: ("client" | "hotelier")[];
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  allowedUserTypes,
}) => {
  const location = useLocation();
  const isAuthenticated = sessionManager.isAuthenticated();
  const userType = sessionManager.getUserType();
  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Oops! Você precisa estar logado para acessar esta página.",
        description: "Você será redirecionado para a página inicial.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (!allowedUserTypes.includes(userType as "client" | "hotelier")) {
      if (allowedUserTypes.includes("hotelier")) {
        toast({
          title:
            "Oops! Você precisa estar logado como hoteleiro para acessar esta página.",
          description: "Você será redirecionado para a página inicial.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title:
            "Oops! Você precisa estar logado como cliente para acessar esta página.",
          description: "Você será redirecionado para a página inicial.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    }
  }, [isAuthenticated, userType, allowedUserTypes, toast]);

  if (
    !isAuthenticated ||
    !allowedUserTypes.includes(userType as "client" | "hotelier")
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
