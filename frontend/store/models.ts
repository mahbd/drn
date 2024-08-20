export interface User {
  id: number;
  email: string;
  role: "CITIZEN" | "DONOR" | "VOLUNTEER" | "ADMIN";
}

export interface RegisterBody extends User {
  password: string;
  name: string;
  phone: string;
  address: string;
}

export interface Alert {
  id: number;
  type: string;
  location: string;
  severity: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface Chat {
  id: number;
  userId: number;
  query: string;
  response: string;
  createdAt: string;
}

export interface Donation {
  id: number;
  userId: number;
  amount: number;
  createdAt: string;
}

export interface RoutePoint {
  id: number;
  latitude: string;
  longitude: string;
}

export interface EvacuationRoute {
  id: number;
  routeName: string;
  routePoints: RoutePoint[];
  createdAt: string;
}

export interface Incident {
  id: number;
  reportedBy: number;
  incidentType: string;
  assignedVolunteers: number[];
  latitude: string;
  longitude: string;
  description: string;
  createdAt: string;
}

export interface Shelter {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
  createdAt: string;
}
