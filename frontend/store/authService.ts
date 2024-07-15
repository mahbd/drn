import { jwtDecode } from "jwt-decode";
import { API } from "@/store/config";
import { redirect } from "next/navigation";
import axios from "axios";

type Role = "admin" | "citizen" | "donor" | "volunteer";

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export function logout(redirectURL?: string) {
  localStorage.removeItem("access");
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

export const loginWithPassword = async (
  email: string,
  password: string,
  redirectURI?: string,
) => {
  try {
    const response = await axios.post(`${API.login}`, {
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

export const refreshAccessToken = () => {
  localStorage.removeItem("access");
};
