import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorization"] as string;
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!auth) {
    res.sendStatus(401).send("Unauthorized");
    return;
  }

  const [authType, token] = auth.split(" ");
  if (authType !== "Basic") {
    res.status(401).send("Unauthorized");
    return;
  }

  const credentials = Buffer.from(token, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).send("Unauthorized");
    return;
  }

  next();
};
