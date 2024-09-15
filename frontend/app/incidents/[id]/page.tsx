"use client";

import IncidentForm from "@/app/incidents/IncidentForm";

const IncidentPage = () => {
  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
          Incident Form
        </h1>
        <IncidentForm />
      </div>
    </div>
  );
};

export default IncidentPage;
