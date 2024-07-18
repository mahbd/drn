"use client";

import DonationForm from "@/app/donations/new/DonationForm";
import { useEffect } from "react";

const NewDonation = () => {
  useEffect(() => {
    document.title = "Donate Now | DRN";
  }, []);

  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>Donate Now</h1>
        <p className={"text-center mb-3"}>
          Your donation makes a difference. Please enter amount you want to
          donate.
        </p>
        <DonationForm />
      </div>
    </div>
  );
};

export default NewDonation;
