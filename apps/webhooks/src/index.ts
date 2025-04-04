import { app } from "./app";

const PORT = process.env.WEBHOOKS_SERVER_PORT || 4001;

app.listen(PORT, () => {
  console.log("Webhooks Server is up & running...");
});
