"use client";

import useModels from "@/store/useModels";
import { Shelter } from "@/store/models";
import { API, ROUTING } from "@/store/config";
import { getCurrentUser } from "@/store/authService";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const SheltersPage = () => {
  const { data: shelters, isLoading } = useModels<Shelter>(API.shelters);
  const user = getCurrentUser();
  return (
    <div>
      {user?.role === "ADMIN" && (
        <div className={"flex flex-col items-center"}>
          <Link
            href={`${ROUTING.newShelter}`}
            className={"btn btn-primary btn-lg my-10"}
          >
            Add New Shelter
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
                  <th className={"text-left"}>Name</th>
                  <th className={"text-left"}>Address</th>
                  <th className={"text-left"}>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shelters?.map((shelter) => (
                  <tr key={shelter.id}>
                    <td className={"text-left"}>{shelter.name}</td>
                    <td className={"text-left"}>{shelter.address}</td>
                    <td className={"text-left"}>{shelter.phone}</td>
                    <td>
                      {user?.role === "ADMIN" && (
                        <Link
                          href={`${ROUTING.shelters}/${shelter.id}`}
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

export default SheltersPage;
