import { toast } from "react-toastify";

export const errorToast = (text?: string) =>
  toast.error(text || "Something went wrong!");

export const warningToast = (text?: string) =>
  toast.warning(text || "Incorrect input!");

export const successToast = (text?: string) =>
  toast.success(text || "Operation completed successfully!");

export const infoToast = (text?: string) =>
  toast.info(text || "Information updated successfully!");