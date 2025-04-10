export interface iUserApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type tUnknownObj = Record<string, any>;
