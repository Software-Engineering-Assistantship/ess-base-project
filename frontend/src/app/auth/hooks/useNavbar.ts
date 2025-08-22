import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiService from "../../../shared/services/api-service";
import { isAxiosError } from "axios";
import { sessionManager } from "../../../shared/config/session-manager";

interface NavbarUserData {
  username: string;
  userType: "client" | "hotelier";
}

const fetchNavbarUserData = async (
  userType: string,
  id: number
): Promise<NavbarUserData | null> => {
  try {
    const response = await apiService.get(`/${userType}/read/${id}`);
    return {
      username: response.data.username,
      userType: userType as "client" | "hotelier",
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      // Token is invalid or expired, treat as logged out
      sessionManager.logout();
      return null;
    }
    console.error(`Error fetching ${userType} data for navbar:`, error);
    throw error;
  }
};

export const useNavbarUserData = (): UseQueryResult<
  NavbarUserData | null,
  unknown
> => {
  const isAuthenticated = sessionManager.isAuthenticated();
  const userType = sessionManager.getUserType();
  const userId = sessionManager.getUserId();

  return useQuery({
    queryKey: ["navbarUserData", userId],
    queryFn: async () => {
      if (!isAuthenticated || !userType || userId === null) return null;
      try {
        return await fetchNavbarUserData(userType, userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    enabled: isAuthenticated && !!userType && userId !== null,
    retry: false,
    staleTime: 300000, // 5 minutes
  });
};
