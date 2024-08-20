"use client";

import useModel from "@/store/useModel";
import { Alert } from "@/store/models";
import { API } from "@/store/config";
import { redirect } from "next/navigation";
import Spinner from "@/components/Spinner";

interface Props {
  params: {
    id: string;
  };
}

const AlertPage = ({ params }: Props) => {
  const { data: alert, isLoading } = useModel<Alert>(API.alerts, params.id);
  if (params.id === "new") {
    redirect("/alerts/new/edit");
  }

  if (isLoading) {
    return <Spinner />;
  }

  return alert ? (
    <div>
      <h1 className={"font-bold text-3xl text-center my-5"}>Alert Details</h1>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h2 className={"h2"}>{alert?.type}</h2>
        <p>{alert?.description}</p>
        <p>{alert?.location}</p>
        <p>{alert?.severity}</p>
        <p>{alert?.isActive ? "Active" : "Inactive"}</p>
      </div>
    </div>
  ) : (
    <div>The requested alert not found</div>
  );
};

export default AlertPage;
