const endpoint = "http://localhost:8081";

export const API = {
  register: endpoint + "/api/users/register",
  login: endpoint + "/api/users/login",
  verifyToken: endpoint + "/api/users/verify",
  refreshToken: endpoint + "/api/users/refresh",
};

export const ROUTING = {
  home: "/home",
  admin: "/admin",
  aboutUs: "/misc/about-us",
  profile: "/users/profile",
  login: "/users/login",
  register: "/users/register",
  forgotPassword: "/users/forgot-password",
};
