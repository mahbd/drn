export const APIEndpoint = "http://localhost:8000";

export const API = {
  register: APIEndpoint + "/api/users/register",
  login: APIEndpoint + "/api/users/login",
  verifyToken: APIEndpoint + "/api/users/verify",
  refreshToken: APIEndpoint + "/api/users/refresh",

  donations: APIEndpoint + "/api/donations",
  alerts: APIEndpoint + "/api/alerts",
  chatbot: APIEndpoint + "/api/chatbot",
  incidents: APIEndpoint + "/api/incidents",
  shelters: APIEndpoint + "/api/shelters",
};

export const ROUTING = {
  alerts: "/alerts",
  newAlert: "/alerts/new",
  home: "/home",
  admin: "/admin",
  ourMission: "/misc/our-mission",
  ourVision: "/misc/our-vision",
  privacyPolicy: "/misc/privacy-policy",
  termsAndConditions: "/misc/terms-and-conditions",
  partnersAndSponsors: "/misc/partners-and-sponsors",
  faq: "/misc/faq",
  ourTeam: "/misc/our-team",
  howWeWork: "/misc/how-we-work",
  profile: "/users/profile",
  login: "/users/login",
  register: "/users/register",
  newDonation: "/donations/new",
  donations: "/donations",
  forgotPassword: "/users/forgot-password",
  chat: "/chat",
  newShelter: "/shelters/new",
  shelters: "/shelters",
};
