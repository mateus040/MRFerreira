import { isAxiosError } from "axios";
import ServiceResult from "../interface/service-result";
import toast from "react-hot-toast";

export default function apiErrorHandler(error: any): void {
  if (
    isAxiosError(error) &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    // if (error.response.status === 401) {

    // }

    const result: ServiceResult = error.response.data;

    if (!result.message) {
      toast.error("Ocorreu um erro inesperado, tente novamente mais tarde.");
      return;
    }

    if (typeof result.message === "object") {
      const error = Object.values(result.message).flat().join(", ");

      toast.error(error);
    } else {
      toast.error(result.message);
    }

    return;
  }

  toast.error("Ocorreu um erro inesperado, tente novamente mais tarde.");
}

export function getApiErrorMessage(error: any): string {
  if (
    isAxiosError(error) &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    const result: ServiceResult = error.response.data;

    if (!result.message) {
      return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }

    if (typeof result.message === "object") {
      return Object.values(result.message).flat().join(", ");
    }

    return result.message
  }

  return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
}
