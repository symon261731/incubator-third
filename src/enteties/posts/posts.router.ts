import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middlewares";
import { postRepository } from "./posts.repository";
import { UpdatePostDTO, PostResponse } from "./posts.service";
import { updatePostSchema, createUpdatePostSchema } from "./validation/schema";
import { formatError } from "../../helpers/formatError";
import { ErrorResponse } from "../../core";
import { mapMongoPostToResponse } from "./posts.mappers";

const postsRouter = Router();

postsRouter
  .get("", async (_, res: Response<PostResponse[]>) => {
    const posts = await postRepository.getAllPosts();
    console.log("posts list", posts);

    res.status(200).send(posts.map((post) => mapMongoPostToResponse(post)));
  })
  .get("/:id", async (req, res: Response<PostResponse | string>) => {
    const id = req.params.id as string;
    const post = await postRepository.getPostById(id);
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    console.log(`route get post/${post?._id}`, post);
    res.status(200).send(mapMongoPostToResponse(post));
  })
  .post(
    "",
    authMiddleware,
    async (
      req: Request<{}, {}, UpdatePostDTO>,
      res: Response<PostResponse | ErrorResponse>,
    ) => {
      const result = createUpdatePostSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          errorsMessages: formatError(result.error),
        });
        return;
      }

      const post = await postRepository.createPost(result.data);

      console.log(`route create post`, post);
      res.status(201).send(mapMongoPostToResponse(post));
    },
  )
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
  .delete("/:id", authMiddleware, async (req, res) => {
    const result = await postRepository.deletePost(req.params.id as string);

    console.log(`route delete post/${req.params.id}`, result);
    if (!result) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send();
  });

export default postsRouter;
