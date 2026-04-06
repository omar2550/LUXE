import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuth = ({ isSuccess }: { isSuccess: boolean }) => {
  if (isSuccess) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default RedirectIfAuth;
