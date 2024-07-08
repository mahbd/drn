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
  ourMission: "/misc/our-mission",
  ourVision: "/misc/our-vision",
  privacyPolicy: "/misc/privacy-policy",
  termsAndConditions: "/misc/terms-and-conditions",
  partnersAndSponsors: "/misc/partners-and-sponsors",
  ourTeam: "/misc/our-team",
  profile: "/users/profile",
  login: "/users/login",
  register: "/users/register",
  forgotPassword: "/users/forgot-password",
};
