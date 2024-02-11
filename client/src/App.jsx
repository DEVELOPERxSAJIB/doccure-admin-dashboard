import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUserData } from "./features/auth/authApiSlice";
import {
  getAllUsers,
  getAllpermission,
  getAllroles,
} from "./features/user/userApiSlice";
import { getAllBrand, getAllCategory, getAllTag } from "./features/product/productApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUserData());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllpermission());
    dispatch(getAllBrand());
    dispatch(getAllroles());
    dispatch(getAllUsers());
    dispatch(getAllTag());
    dispatch(getAllCategory());
  }, [dispatch]);


  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
