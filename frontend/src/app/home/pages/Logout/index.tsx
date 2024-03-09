import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const Logout = () => {
  const { service, state } = useContext(LoginContext);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        service.logout(state.userId); // Chame a função de logout do serviço
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
        // Trate o erro conforme necessário
      }
    };

    handleLogout();
  }, [service, state.userId]);

  return <Navigate to="/home"/>;
};

export default Logout;
