import { app } from "../app";
import user from "./user";

const routes = {
  user: user,
};

export const setupRoutes = () => {
  (Object.keys(routes) as Array<keyof typeof routes>).forEach((key) => {
    app.use(`/api/${key}`, routes[key]);
  });
};
