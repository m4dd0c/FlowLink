export interface iFlowResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type tUnknownObj = Record<string, any>;
