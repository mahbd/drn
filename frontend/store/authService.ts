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
  httpService
    .post(`${API.login}`, { username: email, password })
    .then((response) => {
      setJwt(response.data.access);
      setRefreshToken(response.data.refresh);
      if (redirectURI) {
        redirect(redirectURI);
      } else {
        window.location.reload();
      }
    })
    .catch((error) => {
      alert(error.response.data.errors);
    });
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
  httpService
    .post(`${API.refreshToken}`, {
      refresh: getRefreshToken(),
    })
    .then((response) => {
      localStorage.setItem("access", response.data.access);
      window.location.reload();
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        logout(ROUTING.login);
      }
    });
};
