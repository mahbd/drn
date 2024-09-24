"use client";

import IncidentForm from "@/app/(others)/incidents/[id]/IncidentForm";
import useModel from "@/store/useModel";
import { API } from "@/store/config";
import { Incident } from "@/store/models";
import Spinner from "@/components/Spinner";

interface Props {
  params: {
    id: string;
  };
}

const IncidentPage = ({ params }: Props) => {
  const { data: incident, isLoading } = useModel<Incident>(
    API.incidents,
    params.id,
  );
  if (isLoading && params.id !== "new") {
    return <Spinner />;
  }
  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
          Incident Form
        </h1>
        <IncidentForm incident={incident} />
      </div>
    </div>
  );
};

export default IncidentPage;
