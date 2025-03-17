import { app } from "./app";
import FlowResponse from "./services/FlowResponse";

const PORT = process.env.PORT || 4000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${FRONTEND_URL}`);
});
