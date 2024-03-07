import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { UserProvider } from "./app/home/context/UserContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <HomeProvider>{children}</HomeProvider>
    </UserProvider>
  );
};

export default Provider;
