import { app } from "./app";

const PORT = process.env.PORT || 4000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.listen(PORT, () => {
  console.log("Primary Server is up & running...");
});
