import { jwtDecode } from "jwt-decode";
import httpService from "./httpService";
import { API, ROUTING } from "@/store/config";
import { redirect } from "next/navigation";

type Role = "admin" | "citizen" | "donor" | "volunteer";

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export function logout(redirectURL?: string) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  if (redirectURL) redirect(redirectURL);
  else window.location.reload();
}

export function getJwt() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
}

export function setJwt(jwt: string) {
  return localStorage.setItem("access", jwt);
}

export function setRefreshToken(refreshToken: string) {
  return localStorage.setItem("refresh", refreshToken);
}

export const loginWithPassword = async (
  email: string,
  password: string,
  redirectURI?: string,
) => {
  try {
    const response = await httpService.post(`${API.login}`, {
      email,
      password,
    });
    if (response.status !== 200)
      return { status: false, message: response.data };
    setJwt(response.data.token);
    if (redirectURI) {
      window.location.href = redirectURI;
    } else {
      window.location.reload();
    }
  } catch (error: any) {
    console.log(error);
    return { status: false, message: error };
  }
};

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("access");
    if (jwt) return jwtDecode<DecodedToken>(jwt);
    return null;
  } catch {
    return null;
  }
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export const refreshAccessToken = () => {
  window.location.href = ROUTING.login;
};
