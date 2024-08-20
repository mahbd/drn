"use client";

import useFormComponents from "@/components/useFormComponents";
import {
  IncidentFormData,
  incidentSchema,
} from "@/app/incidents/incidentSchema";
import { Incident } from "@/store/models";
import { useEffect } from "react";
import { getCurrentUser } from "@/store/authService";
import { API, ROUTING } from "@/store/config";
import http from "@/store/http";
import useDialogue from "@/components/useDialogue";

interface Props {
  incident?: Incident;
}

const IncidentForm = ({ incident }: Props) => {
  const { SubmitBtn, handleSubmit, setIsSubmitting } =
    useFormComponents<IncidentFormData>(incidentSchema, {
      incidentType: incident?.incidentType,
      assignedVolunteers: incident?.assignedVolunteers,
      latitude: incident?.latitude,
      longitude: incident?.longitude,
      description: incident?.description,
    });

  const { Dialogue, setTitle, setDescription, showDialogue } = useDialogue();

  useEffect(() => {
    if (getCurrentUser() === null || getCurrentUser()?.role !== "ADMIN") {
      window.location.href = ROUTING.login;
    }
  }, []);

  const doSubmit = async (data: IncidentFormData) => {
    setIsSubmitting(true);
    const res = await http.post<Incident>(API.incidents, data);
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

  return (
    <div>
      <Dialogue />
      <form
        className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
        onSubmit={handleSubmit(doSubmit)}
      >
        <SubmitBtn label={`${incident ? "Update" : "Report"} Incident`} />
      </form>
    </div>
  );
};

export default IncidentForm;
