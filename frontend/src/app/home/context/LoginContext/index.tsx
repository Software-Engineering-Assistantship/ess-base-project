import { createContext, ReactNode, useReducer, useMemo } from "react";
import { LoginState } from "./types";
import LoginService from "./service";
import loginStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface LoginContextProps {
  state: LoginState;
  prevState?: LoginState;
  service: LoginService;
}

export const LoginContext = createContext<LoginContextProps>(
  {} as LoginContextProps
);

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [state, dispatch] = useReducer(loginStateReducer, {
    loginRequestStatus: RequestStatus.idle(),
    logoutRequestStatus: RequestStatus.idle(),
    isLogged: false,
    userId: "",
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new LoginService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <LoginContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
