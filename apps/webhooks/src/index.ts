import { app } from "./app";

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("Webhooks Server is up & running...");
});
