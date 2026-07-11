import express, { Express } from "express";
import blogsRouter from "./enteties/blogs/blogs.router";
import postsRouter from "./enteties/posts/posts.router";
import testingRouter from "./routes/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  // основной роут
  app.get("/", (_, res) => {
    res.status(200).send("Hello world!");
  });

  // /videos
  app.use("/blogs", blogsRouter);

  app.use("/posts", postsRouter);

  app.use("/testing", testingRouter);

  app.use((_, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
};
