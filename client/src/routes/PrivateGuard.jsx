import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateGuard = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateGuard;
