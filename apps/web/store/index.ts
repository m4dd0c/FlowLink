import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import user from "./api/user";
import zaps from "./api/zaps";

const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    [zaps.reducerPath]: zaps.reducer,
  },
  middleware: (gDM) => gDM().concat(user.middleware, zaps.middleware),
});
setupListeners(store.dispatch);

export default store;
