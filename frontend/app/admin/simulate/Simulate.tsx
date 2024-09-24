"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

type Volunteer = {
  id: number;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
};

type Incident = {
  id: number;
  description: string;
  latitude: number;
  longitude: number;
};

const Simulate = ({ mapApiKey }: { mapApiKey: string }) => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [volCnt, setVolCnt] = useState(0);
  const [incCnt, setIncCnt] = useState(0);

  const generateVolunteers = () => {
    const tempVolunteers: Volunteer[] = [];
    for (let i = 0; i < volCnt; i++) {
      tempVolunteers.push({
        id: i,
        name: `Volunteer ${i + 1}`,
        phone: `123456789${i + 1}`,
        latitude: Math.random() * 0.5 + 23,
        longitude: Math.random() * 0.5 + 90,
      });
    }
    setVolunteers(tempVolunteers);
  };

  const generateIncidents = () => {
    const tempIncidents: Incident[] = [];
    for (let i = 0; i < incCnt; i++) {
      tempIncidents.push({
        id: i,
        description: `Incident ${i + 1}`,
        latitude: Math.random() * 0.5 + 23,
        longitude: Math.random() * 0.5 + 90,
      });
    }
    setIncidents(tempIncidents);
  };

  function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLng = degreesToRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  // Helper function to convert degrees to radians
  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Function to assign volunteers to the nearest available incidents
  function assignVolunteers(
    volunteers: Volunteer[],
    incidents: Incident[],
  ): Array<{ lat: number; lng: number }[]> {
    const assignments: Array<{ lat: number; lng: number }[]> = [];

    const assignedIncidents: Set<number> = new Set();

    volunteers.forEach((volunteer) => {
      let nearestIncident: Incident | null = null;
      let minDistance = Infinity;

      incidents.forEach((incident) => {
        if (!assignedIncidents.has(incident.id)) {
          const distance = calculateDistance(
            volunteer.latitude,
            volunteer.longitude,
            incident.latitude,
            incident.longitude,
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestIncident = incident;
          }
        }
      });

      if (nearestIncident) {
        assignments.push([
          { lat: volunteer.latitude, lng: volunteer.longitude },
          // @ts-ignore
          { lat: nearestIncident.latitude, lng: nearestIncident.longitude },
        ]);
        // @ts-ignore
        assignedIncidents.add(nearestIncident.id);
      }
    });

    return assignments;
  }

  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>Simulate</h1>
        <p className={"text-center mb-3"}>
          Simulate alerts and incidents for testing purposes.
        </p>
      </div>
      <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
        <div className={"card bg-base-100 shadow-xl m-1"}>
          <div className={"flex justify-center items-center"}>
            <input
              type={"number"}
              className={"input input-bordered m-2"}
              value={volCnt}
              onChange={(e) => setVolCnt(parseInt(e.target.value))}
            />
          </div>
          <div className={"flex justify-center items-center"}>
            <button
              className={"btn btn-primary text-lg"}
              onClick={() => generateVolunteers()}
            >
              Generate Volunteers
            </button>
          </div>
          <div className={"overflow-x-auto"}>
            <table className={"table w-full"}>
              <thead>
                <tr>
                  <th className={"text-left"}>Name</th>
                  <th className={"text-left"}>Phone</th>
                  <th className={"text-left"}>Latitude</th>
                  <th className={"text-left"}>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td className={"text-left"}>{volunteer.name}</td>
                    <td className={"text-left"}>{volunteer.phone}</td>
                    <td className={"text-left"}>{volunteer.latitude}</td>
                    <td className={"text-left"}>{volunteer.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={"card bg-base-100 shadow-xl m-1"}>
          <div className={"flex justify-center items-center"}>
            <input
              type={"number"}
              className={"input input-bordered m-2"}
              value={incCnt}
              onChange={(e) => setIncCnt(parseInt(e.target.value))}
            />
          </div>
          <div className={"flex justify-center items-center"}>
            <button
              className={"btn btn-primary text-lg"}
              onClick={() => generateIncidents()}
            >
              Generate Incidents
            </button>
          </div>
          <div className={"overflow-x-auto"}>
            <table className={"table w-full"}>
              <thead>
                <tr>
                  <th className={"text-left"}>Description</th>
                  <th className={"text-left"}>Latitude</th>
                  <th className={"text-left"}>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td className={"text-left"}>{incident.description}</td>
                    <td className={"text-left"}>{incident.latitude}</td>
                    <td className={"text-left"}>{incident.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <LoadScript googleMapsApiKey={mapApiKey}>
        <GoogleMap
          mapContainerStyle={{
            width: "800px",
            height: "600px",
          }}
          center={{ lat: 23.25, lng: 90.25 }}
          zoom={9}
        >
          {volunteers.map((volunteer) => (
            <Marker
              icon={{
                url: "/images/volunteer.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              key={volunteer.id}
              position={{ lat: volunteer.latitude, lng: volunteer.longitude }}
            />
          ))}
          {incidents.map((incident) => (
            <Marker
              icon={{
                url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              key={incident.id}
              position={{ lat: incident.latitude, lng: incident.longitude }}
            />
          ))}
          {assignVolunteers(volunteers, incidents).map((assignment, index) => (
            <Polyline key={index} path={assignment} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Simulate;
