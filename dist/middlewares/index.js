"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const auth = req.headers["authorization"];
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "qwerty";
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
exports.authMiddleware = authMiddleware;
