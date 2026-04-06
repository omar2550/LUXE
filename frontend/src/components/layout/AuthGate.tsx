import { ReactNode } from "react";

const AuthGate = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-primary">
        <span className="">Loading...</span>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthGate;
