import { createSlice } from "@reduxjs/toolkit";

const ancillarySlice = createSlice({
  name: "ancillarySlice",
  initialState: {
    trigger: null,
    actions: null,
  },
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
