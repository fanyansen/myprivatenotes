import storage from "local-storage-fallback";
import { TOKEN } from "../constants/auth";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = () => storage.getItem(TOKEN);
export const clearToken = () => storage.removeItem(TOKEN);

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) {
    console.log("checking getToken()...");
    return false;
  }

  try {
    const { exp }: JwtPayload = jwtDecode(token);

    console.log("jwtDecode(token)", jwtDecode(token));

    if (Date.now() >= exp! * 1000) {
      console.log("exp from date exp jwtDecode");
      return false;
    }

    return true;
  } catch (error) {
    console.log("exp from jwtDecode");
    return false;
  }
};
