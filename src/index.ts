import "dotenv/config";
import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings";

const PORT = process.env.PORT || 8080;


const app = express();
setupApp(app);

// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
