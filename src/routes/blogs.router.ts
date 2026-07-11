import { Router } from "express";
import { blogService } from "../repositories/blogs.repository";
import { authMiddleware } from "../middlewares";
import { updateCreateBlogSchema } from "../services/blogs.service";
import { formatError } from "../helpers/formatError";

const blogsRouter = Router();

blogsRouter
  .get("/", (_, res) => {
    const blogs = blogService.getAllBlogs();
    res.status(200).send(blogs);
  })
  .get("/:id", (req, res) => {
    const blog = blogService.getBlogById(req.params.id);
    if (Boolean(blog)) {
      res.status(200).send(blog);
    } else {
      res.status(404).send("Blog not found");
    }
  })
  .post("", authMiddleware, (req, res) => {
    const result = updateCreateBlogSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        errorsMessages: formatError(result.error),
      });
      return;
    }

    const blog = blogService.createBlog(result.data);
    res.status(201).send(blog);
  })
  .put("/:id", authMiddleware, (req, res) => {
    const id = req.params.id as string | undefined;

    if (!id) {
      res.status(400).send("id is required");
      return;
    }

    const validateResult = updateCreateBlogSchema.safeParse(req.body);

    if (!validateResult.success) {
      res.status(400).json({
        errorsMessages: formatError(validateResult.error),
      });

      return;
    }

    const successUpdatedBlog = blogService.updateBlog(id, validateResult.data);
    if (!successUpdatedBlog) {
      res.status(404).send("not found");
      return;
    }

    res.status(204).send();
  })
  .delete("/:id", authMiddleware, (req, res) => {
    const result = blogService.deleteBlog(req.params.id as string);
    if (!result) {
      res.status(404).send("Blog not found");
      return;
    }
    res.status(204).send();
  });

export default blogsRouter;
