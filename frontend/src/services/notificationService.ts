import { toast } from "react-toastify";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};

export const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};