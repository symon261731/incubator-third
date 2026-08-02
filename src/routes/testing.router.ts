import { Router } from "express";
import { blogRepository } from "../enteties/blogs/blogs.repository";
import { postRepository } from "../enteties/posts/posts.repository";

const testingRouter = Router();

testingRouter.delete("/all-data", async (_, res) => {
  await blogRepository.deleteAllBlogs();
  await postRepository.deleteAllPosts();

  res.status(204).send("All data deleted");
  console.log("All data deleted");
  return;
});

export default testingRouter;
