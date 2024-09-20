import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (localStorage.getItem("token")?.length) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
