import { HomeProvider } from "./app/home/context/HomeContext";

const Provider = ({ children }) => {
  return <HomeProvider>{children}</HomeProvider>;
};

export default Provider;
