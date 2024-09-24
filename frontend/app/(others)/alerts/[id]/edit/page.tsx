"use client";

import { useEffect } from "react";
import AlertForm from "@/app/(others)/alerts/[id]/edit/AlertForm";
import Spinner from "@/components/Spinner";
import useModel from "@/store/useModel";
import { Alert } from "@/store/models";
import { API } from "@/store/config";

interface Props {
  params: {
    id: string;
  };
}

const AddAlert = ({ params }: Props) => {
  useEffect(() => {
    document.title = "Donate Now | DRN";
  }, []);
  const { data: alert, isLoading } = useModel<Alert>(API.alerts, params.id);

  if (params.id === "new") {
    return (
      <div className={"horizontal-center max-w-lg lg:mt-24"}>
        <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
          <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
            Alert Form
          </h1>
          <AlertForm />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return Spinner();
  }

  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>Alert Form</h1>
        <AlertForm alert={alert} />
      </div>
    </div>
  );
};

export default AddAlert;
