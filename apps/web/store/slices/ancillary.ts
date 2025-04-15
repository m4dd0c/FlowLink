import { iAncillarySliceState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { LuPlugZap } from "react-icons/lu";

const initialState: iAncillarySliceState = {
  trigger: {
    id: 0,
    title: "Add a Custom Trigger Title",
    icon: LuPlugZap,
    availableTriggerId: "",
    triggerMetadata: {},
  },
  actions: [
    {
      id: 1,
      title: "Add a Custom Action Title",
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
