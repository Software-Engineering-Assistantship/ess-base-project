import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  iat: number;
  exp: number;
}

class SessionManager {
  private static instance: SessionManager;
  private readonly tokenKey = "accessToken";
  private readonly userTypeKey = "userType";

  private constructor() {
    // .
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setUserType(userType: "client" | "hotelier"): void {
    localStorage.setItem(this.userTypeKey, userType);
  }

  public getUserType(): "client" | "hotelier" | null {
    return localStorage.getItem(this.userTypeKey) as
      | "client"
      | "hotelier"
      | null;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  public getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.id;
    } catch (error) {
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userTypeKey);
  }

  public getTokenExpirationTime(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.exp;
    } catch (error) {
      return null;
    }
  }

  public refreshToken(newToken: string): void {
    this.setToken(newToken);
  }
}

export const sessionManager = SessionManager.getInstance();
