"use client";

import { Donation } from "@/store/models";
import useModels from "@/store/useModels";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { API, ROUTING } from "@/store/config";
import { useEffect } from "react";

const DonationsPage = () => {
  const { data: donations, isLoading } = useModels<Donation>(API.donations);
  useEffect(() => {
    document.title = "Donations | DRN";
  }, []);

  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <Link
          href={ROUTING.newDonation}
          className={"btn btn-primary btn-lg my-10"}
        >
          Donate Now
        </Link>
      </div>
      <div>
        <h2 className={"section-title"}>Recent Donations</h2>
        {isLoading ? (
          <div className={"flex justify-center items-center"}>
            <Spinner />
          </div>
        ) : (
          <div className={"overflow-x-auto"}>
            <table className={"table w-full"}>
              <thead>
                <tr>
                  <th className={"text-left"}>User</th>
                  <th className={"text-left"}>Amount</th>
                  <th className={"text-left"}>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations?.map((donation) => (
                  <tr key={donation.id}>
                    <td className={"text-left"}>{donation.userId}</td>
                    <td className={"text-left"}>{donation.amount} BDT</td>
                    <td className={"text-left"}>{donation.createdAt}</td>
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

export default DonationsPage;
