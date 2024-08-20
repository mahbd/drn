"use client";

import { Alert } from "@/store/models";
import useModels from "@/store/useModels";
import Spinner from "@/components/Spinner";
import { API, ROUTING } from "@/store/config";
import { useEffect } from "react";
import { getCurrentUser } from "@/store/authService";
import Link from "next/link";
import http from "@/store/http";

const AlertsPage = () => {
  const { data: alerts, isLoading } = useModels<Alert>(API.alerts);
  useEffect(() => {
    document.title = "Alerts | DRN";
  }, []);

  const user = getCurrentUser();

  return (
    <div>
      {user?.role === "ADMIN" && (
        <div className={"flex flex-col items-center"}>
          <Link
            href={ROUTING.newAlert}
            className={"btn btn-primary btn-lg my-10"}
          >
            Add New Alert
          </Link>
        </div>
      )}
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
                  <th className={"text-left"}>Location</th>
                  <th className={"text-left"}>Severity</th>
                  <th className={"text-left"}>Description</th>
                  <th className={"text-left"}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts?.map((alert) => (
                  <tr key={alert.id}>
                    <td className={"text-left"}>{alert.type}</td>
                    <td className={"text-left"}>{alert.location}</td>
                    <td className={"text-left"}>{alert.severity}</td>
                    <td className={"text-left"}>
                      {alert.description.slice(0, 30)}{" "}
                      {alert.description.length > 30 ? "..." : ""}
                    </td>
                    <td className={"text-left"}>
                      <Link
                        href={`${ROUTING.alerts}/${alert.id}`}
                        className={"btn btn-success btn-sm"}
                      >
                        Details
                      </Link>
                      {user?.role === "ADMIN" && (
                        <Link
                          href={`${ROUTING.alerts}/${alert.id}/edit`}
                          className={"btn btn-primary btn-sm ms-2"}
                        >
                          Edit
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          const res = await http.delete<void>(
                            `${API.alerts}/${alert.id}`,
                          );
                          if (res.status === 204) {
                            window.location.reload();
                          }
                        }}
                        className={"btn btn-error btn-sm ms-2"}
                      >
                        Delete
                      </button>
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

export default AlertsPage;
