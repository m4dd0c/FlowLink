import { app } from "./app";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const PORT = process.env.MAIN_SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log("Primary Server is up & running...");
});
