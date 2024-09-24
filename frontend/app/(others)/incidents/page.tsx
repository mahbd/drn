"use client";

import useModels from "@/store/useModels";
import { API, ROUTING } from "@/store/config";
import { Incident } from "@/store/models";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { getCurrentUser } from "@/store/authService";

const IncidentsPage = () => {
  const { data: incidents, isLoading } = useModels<Incident>(API.incidents);
  const user = getCurrentUser();
  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <Link
          href={`${ROUTING.newIncident}`}
          className={"btn btn-primary btn-lg my-10"}
        >
          Report New Incident
        </Link>
      </div>
      <div>
        <h2 className={"section-title"}>Recent Alerts</h2>
        {isLoading ? (
          <div className={"flex justify-center items-center"}>
            <Spinner />
          </div>
        ) : (
          <div className={"overflow-x-auto"}>
            <table className={"table w-full"}>
              <thead>
                <tr>
                  <th className={"text-left"}>Type</th>
                  <th className={"text-left"}>Description</th>
                  <th className={"text-left"}>Latitude</th>
                  <th className={"text-left"}>Longitude</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents?.map((incident) => (
                  <tr key={incident.id}>
                    <td className={"text-left"}>{incident.incidentType}</td>
                    <td className={"text-left"}>{incident.description}</td>
                    <td className={"text-left"}>{incident.latitude}</td>
                    <td className={"text-left"}>{incident.longitude}</td>
                    <td>
                      {user?.role === "ADMIN" && (
                        <Link
                          href={`${ROUTING.incidents}/${incident.id}`}
                          className={"btn btn-sm btn-primary"}
                        >
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentsPage;
