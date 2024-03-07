import { createContext, ReactNode, useReducer, useMemo } from "react";
import { UserState } from "./types";
import UserService from "./service";
import userStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface UserContextProps {
  state: UserState;
  prevState?: UserState;
  service: UserService;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userStateReducer, {
    createUserRequestStatus: RequestStatus.idle(),
    getUserRequestStatus: RequestStatus.idle(),
    updateUserRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new UserService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <UserContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
