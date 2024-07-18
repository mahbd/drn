"use client";

import { Alert } from "@/store/models";
import useModels from "@/store/useModels";
import Spinner from "@/components/Spinner";
import { API, ROUTING } from "@/store/config";
import { useEffect } from "react";
import { getCurrentUser } from "@/store/authService";
import Link from "next/link";

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
                    <td className={"text-left"}>{alert.description}</td>
                    <td className={"text-left"}>
                      <Link
                        href={`${ROUTING.alerts}/${alert.id}`}
                        className={"btn btn-primary btn-sm"}
                      >
                        Edit
                      </Link>
                      {/*<Link*/}
                      {/*  href={`${ROUTING.deleteAlert}/${alert.id}`}*/}
                      {/*  className={"btn btn-error btn-sm"}*/}
                      {/*>*/}
                      {/*  Delete*/}
                      {/*</Link>*/}
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
