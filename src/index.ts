import express from "express";
import { setupApp } from "./setup-app";

const PORT = process.env.PORT || 8080;

const app = express();
setupApp(app);

// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
