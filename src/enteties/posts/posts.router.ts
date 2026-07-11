import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { postService } from "./posts.repository";
import { createUpdatePostSchema } from "./posts.service";
import { formatError } from "../../helpers/formatError";

const postsRouter = Router();

postsRouter
  .get("", (_, res) => {
    const posts = postService.posts;
    res.status(200).send(posts);
  })
  .get("/:id", (req, res) => {
    const id = req.params.id as string;
    const post = postService.getPostById(id);
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.status(200).send(post);
  })
  .post("", authMiddleware, (req, res) => {
    const result = createUpdatePostSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errorsMessages: formatError(result.error),
      });
      return;
    }

    const post = postService.createPost(result.data);

    res.status(201).send(post);
  })
  .put("/:id", authMiddleware, (req, res) => {
    const id = req.params.id as string;

    const result = createUpdatePostSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errorsMessages: formatError(result.error),
      });
      return;
    }

    const isPostUpdated = postService.updatePost(id, result.data);

    if (!isPostUpdated) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send();
  })
  .delete("/:id", authMiddleware, (req, res) => {
    const result = postService.deletePost(req.params.id as string);

    if (!result) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send();
  });

export default postsRouter;
