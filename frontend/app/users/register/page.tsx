import RegisterForm from "@/app/users/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className={"horizontal-center max-w-lg"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
          Welcome Back
        </h1>
        <p className={"text-center mb-3"}>
          Please Enter Your Credentials to continue.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
