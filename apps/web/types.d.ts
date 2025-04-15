import { IconType } from "react-icons/lib";

export interface iFlowResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type tUnknownObj = Record<string, any>;

export interface iAncillarySliceState {
  trigger: {
    id: number;
    title: string;
    label: string;
    icon: IconType;
    availableTriggerId: string;
    triggerMetadata?: any;
  };
  actions: {
    id: number;
    title: string;
    label: string;
    icon: IconType;
    availableActionId: string;
    actionMetadata?: any;
  }[];
}

export interface iSliceState {
  ancillarySlice: iAncillarySliceState;
}
