import LoginForm from "@/app/users/login/LoginForm";

const LoginPage = () => {
  return (
    <div className={"horizontal-center max-w-lg lg:mt-24"}>
      <div className={"bg-base-100 rounded-3xl p-5 m-3"}>
        <h1 className={"h1 font-bold text-3xl text-center mt-5"}>
          Welcome Back
        </h1>
        <p className={"text-center mb-3"}>
          Please Enter Your Credentials to continue.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
