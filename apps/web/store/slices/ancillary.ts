import { iAncillarySliceState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { LuPlugZap } from "react-icons/lu";

const initialState: iAncillarySliceState = {
  trigger: {
    id: 0,
    title: "Trigger",
    label: "Add a custom trigger label",
    icon: LuPlugZap,
    availableTriggerId: "",
    triggerMetadata: {},
  },
  actions: [
    {
      id: 1,
      title: "Action",
      label: "Add a custom action label",
      icon: BsFillLightningChargeFill,
      availableActionId: "",
      actionMetadata: {},
    },
  ],
};

const ancillarySlice = createSlice({
  name: "ancillarySlice",
  initialState,
  reducers: {
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setActions: (state, action) => {
      state.actions = action.payload;
    },
  },
});

export const { setTrigger, setActions } = ancillarySlice.actions;
export default ancillarySlice.reducer;
