import { app } from "../app";

import zap from "./zaps";
import user from "./user";
import actions from "./actions";
import triggers from "./triggers";

const routes = {
  user,
  zap,
  actions,
  triggers,
};

export const setupRoutes = () => {
  (Object.keys(routes) as Array<keyof typeof routes>).forEach((key) => {
    app.use(`/api/${key}`, routes[key]);
  });
};
