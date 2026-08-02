import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { postRepository } from "./posts.repository";
import { createUpdatePostSchema, updatePostSchema } from "./posts.service";
import { formatError } from "../../helpers/formatError";

const postsRouter = Router();

postsRouter
  .get("", (_, res) => {
    const posts = postRepository;
    res.status(200).send(posts);
  })
  .get("/:id", (req, res) => {
    const id = req.params.id as string;
    const post = postRepository.getPostById(id);
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

    const post = postRepository.createPost(result.data);

    res.status(201).send(post);
  })
  .put("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id as string;

    const result = updatePostSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errorsMessages: formatError(result.error),
      });
      return;
    }

    const isPostUpdated = await postRepository.updatePost(id, result.data);

    if (!isPostUpdated) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send();
  })
  .delete("/:id", authMiddleware, (req, res) => {
    const result = postRepository.deletePost(req.params.id as string);

    if (!result) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send();
  });

export default postsRouter;
