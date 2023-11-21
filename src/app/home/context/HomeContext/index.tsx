import { createContext, ReactNode, useReducer, useMemo } from "react";
import { HomeState } from "./types";
import HomeService from "./service";
import homeStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";

interface HomeContextProps {
  state: HomeState;
  prevState?: HomeState;
  service: HomeService;
}

export const HomeContext = createContext<HomeContextProps>(
  {} as HomeContextProps
);

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [state, dispatch] = useReducer(homeStateReducer, {
    createTestRequestStatus: RequestStatus.idle(),
    getTestsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new HomeService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <HomeContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
