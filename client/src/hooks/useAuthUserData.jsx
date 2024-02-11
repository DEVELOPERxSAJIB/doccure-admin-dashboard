import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";

const useAuthUserData = () => {
  const { user } = useSelector(getAuthData);

  return { user };
};

export default useAuthUserData;
