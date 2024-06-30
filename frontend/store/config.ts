const endpoint = "http://localhost:3000";

export const API = {
  login: endpoint + "/api/auth/login",
  verifyToken: endpoint + "/api/auth/verify",
  refreshToken: endpoint + "/api/auth/refresh",
};

export const ROUTING = {
  home: "/home",
  admin: "/admin",
  aboutUs: "/misc/about-us",
  profile: "/users/profile",
  login: "/users/login",
};
