import { app } from "../app";
import user from "./user";
import zap from "./zap";

const routes = {
  user,
  zap,
};

export const setupRoutes = () => {
  (Object.keys(routes) as Array<keyof typeof routes>).forEach((key) => {
    app.use(`/api/${key}`, routes[key]);
  });
};
