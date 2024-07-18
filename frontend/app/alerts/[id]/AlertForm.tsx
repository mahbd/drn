"use client";

import useFormComponents from "@/components/useFormComponents";
import { API, ROUTING } from "@/store/config";
import http from "@/store/http";
import useDialogue from "@/components/useDialogue";
import { getCurrentUser } from "@/store/authService";
import { useEffect } from "react";
import { AlertFormData, alertSchema } from "@/app/alerts/[id]/alertSchema";
import { Alert } from "@/store/models";

interface Props {
  alert?: Alert;
}

const AlertForm = ({ alert }: Props) => {
  const { CheckBox, Input, Select, SubmitBtn, handleSubmit, setIsSubmitting } =
    useFormComponents<AlertFormData>(alertSchema, {
      type: alert?.type || "",
      severity: alert?.severity || "",
      description: alert?.description || "",
      location: alert?.location || "",
      isActive: alert?.isActive || true,
    });

  const { Dialogue, setTitle, setDescription, showDialogue } = useDialogue();

  useEffect(() => {
    if (getCurrentUser() === null || getCurrentUser()?.role !== "ADMIN") {
      window.location.href = ROUTING.login;
    }
  }, []);

  const doSubmit = async (data: AlertFormData) => {
    setIsSubmitting(true);
    const res = await http.post<Alert>(API.alerts, data);
    if (res.status === 201) {
      setTitle("Success!");
      setDescription("Alert created successfully!");
      window.location.href = ROUTING.alerts;
    } else {
      setTitle("Error!");
      setDescription("Something went wrong!");
    }
    showDialogue();
    setIsSubmitting(false);
  };

  const deleteAlert = async () => {
    setIsSubmitting(true);
    const res = await http.delete<Alert>(`${API.alerts}/${alert?.id}`);
    if (res.status === 200) {
      setTitle("Success!");
      setDescription("Alert deleted successfully!");
      window.location.href = ROUTING.alerts;
    } else {
      setTitle("Error!");
      setDescription("Something went wrong!");
    }
    showDialogue();
    setIsSubmitting(false);
  };

  return (
    <div>
      <Dialogue />
      <form
        className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
        onSubmit={handleSubmit(doSubmit)}
      >
        <Select
          name={"type"}
          items={[
            { value: "STORM", label: "Storm" },
            { value: "FLOOD", label: "Flood" },
            { value: "EARTHQUAKE", label: "Earthquake" },
          ]}
        />
        <Select
          name={"severity"}
          items={[
            { value: "HIGH", label: "High" },
            { value: "MEDIUM", label: "Medium" },
            { value: "LOW", label: "Low" },
          ]}
        />
        <Input name={"description"} type={"text"} />
        <Input name={"location"} type={"text"} />
        <CheckBox name={"isActive"} label={"Active"} />
        <SubmitBtn label={`Create Alert`} />
        {alert?.id && (
          <button className={"btn btn-error btn-sm"} onClick={deleteAlert}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default AlertForm;
