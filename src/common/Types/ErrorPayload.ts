class ErrorPayload {
  message: string;
  stack: string[];
  path: string;
  data: object;
  status: number;
  statusText: string;
  requestId: string;
}

export {
  ErrorPayload
};