import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import user from "./api/user";

const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
  },
  middleware: (gDM) => gDM().concat(user.middleware),
});
setupListeners(store.dispatch);

export default store;
