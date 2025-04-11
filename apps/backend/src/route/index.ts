import { app } from "../app";

import zaps from "./zaps";
import user from "./user";
import actions from "./actions";
import triggers from "./triggers";

const routes = {
  user,
  zaps,
  actions,
  triggers,
};

export const setupRoutes = () => {
  (Object.keys(routes) as Array<keyof typeof routes>).forEach((key) => {
    app.use(`/api/${key}`, routes[key]);
  });
};
