import { AxiosError } from "axios";
import { IErrorState } from "../interfaces/error-state.interface";

export function checkException(error: unknown): IErrorState {
  if (error instanceof AxiosError && error.response) {
    if (error.response.status >= 400 && error.response.status < 500) {
      return { level: "warn", message: error.message };
    } else if (error.response.status >= 500) {
      return { level: "error", message: error.message };
    } else {
      return { level: "error", message: error.message };
    }
  } else if (error instanceof Error) {
    return { level: "error", message: error.message };
  } else {
    return { level: "error", message: "Something is wrong" };
  }
}
