export interface IApiErrorResponse {
  name: string;
  message: string;
  code: number;
  status: number;
  type: string;
}

export interface IApiResponse<T> {
  success: true;
  status: number;
  data: T;
}
