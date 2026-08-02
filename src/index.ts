import "dotenv/config";
import express from "express";
import { setupApp } from "./setup-app";
import { runDB } from "./db/mongo.db";
import { SETTINGS } from "./settings";

const bootstrap = async () => {
  const PORT = process.env.PORT || 8080;
  const app = express();

  await runDB(SETTINGS.MONGO_URL || "");
  setupApp(app);

  // запуск приложения
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

bootstrap();
