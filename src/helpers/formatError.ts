import { ZodError } from "zod";
import { ErrorMessage } from "../core";

export const formatError = (error: ZodError): ErrorMessage[] => {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};
