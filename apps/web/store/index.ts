import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import user from "./api/user";
import zaps from "./api/zaps";
import ancillary from "./api/ancillary";
import ancillarySlice from "./slices/ancillary";

const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    [zaps.reducerPath]: zaps.reducer,
    [ancillary.reducerPath]: ancillary.reducer,
    ancillarySlice: ancillarySlice,
  },
  middleware: (gDM) =>
    gDM({ serializableCheck: false }).concat(
      user.middleware,
      zaps.middleware,
      ancillary.middleware,
    ),
});
setupListeners(store.dispatch);

export default store;
