export interface ErrorMessage {
  message: string;
  field: string;
}

export interface ErrorResponse {
  errorsMessages: ErrorMessage[];
}