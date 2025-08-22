import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiService from "../../../shared/services/api-service";
import { Client, Hotelier } from "../models/UsersModel";
import { sessionManager } from "../../../shared/config/session-manager";

const fetchClientData = async (id: number): Promise<Client> => {
  const response = await apiService.get(`/client/read/${id}`);
  return response.data;
};

const fetchHotelierData = async (id: number): Promise<Hotelier> => {
  const response = await apiService.get(`/hotelier/read/${id}`);
  return response.data;
};

export const useClientData = (): UseQueryResult<Client | null, unknown> => {
  const isAuthenticated = sessionManager.isAuthenticated();
  const userType = sessionManager.getUserType();
  const userId = sessionManager.getUserId();

  return useQuery({
    queryKey: ["clientData", userId],
    queryFn: () => {
      if (!isAuthenticated || userType !== "client" || userId === null) {
        return null;
      }
      return fetchClientData(userId);
    },
    retry: false,
  });
};

export const useHotelierData = (): UseQueryResult<Hotelier | null, unknown> => {
  const isAuthenticated = sessionManager.isAuthenticated();
  const userType = sessionManager.getUserType();
  const userId = sessionManager.getUserId();

  return useQuery({
    queryKey: ["hotelierData", userId],
    queryFn: () => {
      if (!isAuthenticated || userType !== "hotelier" || userId === null) {
        return null;
      }
      return fetchHotelierData(userId);
    },
    retry: false,
  });
};
