import { toast } from "react-toastify";

export const createToast = (msg, type = "success") => {
  toast[type](msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    theme: "light", //"colored"
  });
};
