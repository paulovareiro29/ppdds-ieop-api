import express from "express";
import helmet from "helmet";
import { CLIENT_KEY, CLIENT_SECRET, PORT } from "./config";
import routes from "./routes";

if (!CLIENT_KEY || !CLIENT_SECRET) {
  throw new Error(
    "Please provide CLIENT_KEY and CLIENT_SECRET in the .env file"
  );
}

const app = express();
app.use(helmet());
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`IEOP PPDDS listening on port ${PORT}`);
});
