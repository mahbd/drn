"use client";

import useFormComponents from "@/components/useFormComponents";
import { API, ROUTING } from "@/store/config";
import httpService from "@/store/httpService";
import {
  RegisterFormData,
  registerSchema,
} from "@/app/users/register/registerSchema";

const RegisterForm = () => {
  const { Input, SubmitBtn, handleSubmit, setIsSubmitting, setError } =
    useFormComponents<RegisterFormData>(registerSchema, {});

  const doSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." });
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await httpService.post(API.register, data);
      if (res.status !== 201) {
        console.log(res);
        alert("An error occurred. Please try again later.");
      } else {
        window.location.href = ROUTING.login;
        alert("Registration successful. Redirecting to login.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <form
      className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
      onSubmit={handleSubmit(doSubmit)}
    >
      <Input name="email" type={"email"} />
      <Input name="name" type="text" />
      <Input name="phone" type="text" />
      <Input name="address" type="text" />
      <Input name="password" type="text" />
      <Input name="confirmPassword" type="text" />
      <SubmitBtn label={`Register Now`} />
    </form>
  );
};

export default RegisterForm;
