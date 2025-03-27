import { app } from "../app";
import user from "./user";

const routes = {
  user
};

export const setupRoutes = () => {
  Object.keys(routes).forEach((key) => {
    app.use(`/api/${key}`, routes[key])
  }
}
