"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = __importDefault(require("./enteties/blogs/blogs.router"));
const posts_router_1 = __importDefault(require("./enteties/posts/posts.router"));
const testing_router_1 = __importDefault(require("./routes/testing.router"));
const setupApp = (app) => {
    app.use(express_1.default.json());
    // основной роут
    app.get("/", (_, res) => {
        res.status(200).send("Hello world!");
    });
    // /videos
    app.use("/blogs", blogs_router_1.default);
    app.use("/posts", posts_router_1.default);
    app.use("/testing", testing_router_1.default);
    app.use((_, res) => {
        res.status(404).json({ error: "Not found" });
    });
    return app;
};
exports.setupApp = setupApp;
