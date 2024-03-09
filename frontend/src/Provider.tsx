import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { UserProvider } from "./app/home/context/UserContext";
import { LoginProvider } from "./app/home/context/LoginContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LoginProvider>
      <UserProvider>
        <HomeProvider>{children}</HomeProvider>
      </UserProvider>
    </LoginProvider>
  );
};

export default Provider;
