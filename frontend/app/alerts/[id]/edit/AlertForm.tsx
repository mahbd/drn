"use client";

import useFormComponents from "@/components/useFormComponents";
import { API, ROUTING } from "@/store/config";
import http from "@/store/http";
import useDialogue from "@/components/useDialogue";
import { getCurrentUser } from "@/store/authService";
import { useEffect } from "react";
import { AlertFormData, alertSchema } from "@/app/alerts/[id]/edit/alertSchema";
import { Alert } from "@/store/models";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  alert?: Alert;
}

const AlertForm = ({ alert }: Props) => {
  const { toast } = useToast();
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
    let res;
    if (alert?.id) {
      res = await http.put<Alert>(`${API.alerts}/${alert.id}`, data);
    } else {
      res = await http.post<Alert>(API.alerts, data);
    }
    if (res.status === 200 || res.status === 201) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Your action was successful. Now redirecting...",
      });
      window.location.href = ROUTING.alerts;
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
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
            { value: "Storm", label: "Storm" },
            { value: "Fire", label: "Fire" },
            { value: "Flood", label: "Flood" },
            { value: "Earthquake", label: "Earthquake" },
          ]}
        />
        <Select
          name={"severity"}
          items={[
            { value: "High", label: "High" },
            { value: "Medium", label: "Medium" },
            { value: "Low", label: "Low" },
          ]}
        />
        <Input name={"description"} type={"text"} />
        <Input name={"location"} type={"text"} />
        <CheckBox name={"isActive"} label={"Active"} />
        <SubmitBtn label={alert?.id ? "Update alert" : `Create Alert`} />
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
