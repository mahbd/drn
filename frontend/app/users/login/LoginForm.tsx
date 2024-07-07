"use client";

import useFormComponents from "@/components/useFormComponents";
import { LoginFormData, loginSchema } from "@/app/users/login/loginSchema";
import Link from "next/link";
import { ROUTING } from "@/store/config";
import { loginWithPassword } from "@/store/authService";

const LoginForm = () => {
  const { Input, SubmitBtn, handleSubmit, setIsSubmitting, setError } =
    useFormComponents<LoginFormData>(loginSchema, {});

  const doSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const redirectURI =
      new URLSearchParams(window.location.search).get("redirectURI") ||
      ROUTING.home;

    const res = await loginWithPassword(data.email, data.password, redirectURI);
    if (res && !res.status)
      setError("email", { message: "Invalid email or password" });
    setIsSubmitting(false);
  };

  return (
    <form
      className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
      onSubmit={handleSubmit(doSubmit)}
    >
      <Input name="email" type={"email"} />
      <Input name="password" type="text" />
      <div className={"flex justify-between my-3"}>
        <Link href={ROUTING.register} className={"link link-primary"}>
          Register
        </Link>
        <Link href={ROUTING.forgotPassword} className={"link link-primary"}>
          Forgot Password
        </Link>
      </div>
      <SubmitBtn label={`Login Now`} />
    </form>
  );
};

export default LoginForm;
