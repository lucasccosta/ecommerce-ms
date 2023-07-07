import { CustomError } from "./CustomError";

export interface HttpResponse {
  body?: any;
  statusCode: number;
  error?: CustomError;
}
export interface HttpRRequest {
  headers?: any;
  body?: any;
}
