"use client";

import useFormComponents from "@/components/useFormComponents";
import { API, ROUTING } from "@/store/config";
import {
  DonationFormData,
  donationSchema,
} from "@/app/donations/new/donationSchema";
import http from "@/store/http";
import { Donation } from "@/store/models";
import useDialogue from "@/components/useDialogue";
import { getCurrentUser } from "@/store/authService";
import { useEffect } from "react";

const LoginForm = () => {
  const { Input, SubmitBtn, handleSubmit, setIsSubmitting, setError } =
    useFormComponents<DonationFormData>(donationSchema, {});

  const { Dialogue, setTitle, setDescription, showDialogue } = useDialogue();

  useEffect(() => {
    if (getCurrentUser() === null) {
      window.location.href =
        ROUTING.login + "?redirectURI=" + ROUTING.newDonation;
    }
  }, []);

  const doSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    const res = await http.post<Donation>(API.donations, data);
    if (res.status === 201) {
      setTitle("Success!");
      setDescription("Donation Successfully Made!");
      window.location.href = ROUTING.donations;
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
        <Input name={"amount"} type={"number"} />
        <SubmitBtn label={`Donate Now`} />
      </form>
    </div>
  );
};

export default LoginForm;
