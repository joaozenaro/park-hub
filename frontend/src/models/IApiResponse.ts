export interface IApiErrorResponse {
  success: false;
  status: number;
  data: {
    name: string;
    message: string;
    code: number;
    status: number;
    type: string;
  };
}

export interface IApiResponse<T> {
  success: true;
  status: number;
  data: T;
}
