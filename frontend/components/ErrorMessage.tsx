import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className="text-red-500 text-sm" role="alert">
      {children}
    </p>
  );
};

export default ErrorMessage;
