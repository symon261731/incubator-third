import { Router } from "express";
import { blogService } from "../repositories/blogs.repository";
import { postService } from "../repositories/posts.repository";

const testingRouter = Router();

testingRouter.delete("/all-data", (req, res) => {
  blogService.deleteAllBlogs();
  postService.deleteAllPosts();

  res.status(204).send("All data deleted");
  console.log("All data deleted");
});

export default testingRouter;
