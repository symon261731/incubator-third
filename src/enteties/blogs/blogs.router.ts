import { Request, Response, Router } from "express";
import { blogRepository } from "./blogs.repository";
import { authMiddleware } from "../../middlewares";
import { BlogResponse, CreateBlogDTO } from "./blogs.service";
import { updateBlogSchema, updateCreateBlogSchema } from "./validation/schema";
import { formatError } from "../../helpers/formatError";
import { mapMongoBlogToResponse } from "./blogs.mappers";
import { ErrorResponse } from "../../core";

const blogsRouter = Router();

blogsRouter
  .get("/", async (_, res: Response<BlogResponse[]>) => {
    const blogs = await blogRepository.getAllBlogs();
    console.log("route /", blogs);
    res.status(200).send(blogs.map((blog) => mapMongoBlogToResponse(blog)));
  })
  .get("/:id", async (req, res: Response<BlogResponse | string>) => {
    const blog = await blogRepository.getBlogById(req.params.id);
    if (!blog) {
      res.status(404).send("Blog not found");
      return;
    }

    console.log(`route get post/${blog?._id}`, blog);
    res.status(200).send(mapMongoBlogToResponse(blog));
  })

  .post(
    "",
    authMiddleware,
    async (
      req: Request<{}, {}, CreateBlogDTO>,
      res: Response<BlogResponse | ErrorResponse>,
    ) => {
      const result = updateCreateBlogSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          errorsMessages: formatError(result.error),
        });
        return;
      }

      const blog = await blogRepository.createBlog(result.data);
      console.log(`route create post`, blog);
      res.status(201).send(mapMongoBlogToResponse(blog));
    },
  )
  .put("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id as string | undefined;

    if (!id) {
      res.status(400).send("id is required");
      return;
    }

    const validateResult = updateBlogSchema.safeParse(req.body);

    if (!validateResult.success) {
      res.status(400).json({
        errorsMessages: formatError(validateResult.error),
      });

      return;
    }

    const successUpdatedBlog = await blogRepository.updateBlog(
      id,
      validateResult.data,
    );
    if (!successUpdatedBlog) {
      res.status(404).send("not found");
      return;
    }

    console.log(`route update blog/${id}`, successUpdatedBlog);
    res.status(204).send();
  })
  .delete(
    "/:id",
    authMiddleware,
    async (req: Request<{ id: string }>, res: Response<void | string>) => {
      const result = await blogRepository.deleteBlog(req.params.id);
      console.log(`route delete blog/${req.params.id}`, result);
      if (!result) {
        res.status(404).send("Blog not found");
        return;
      }
      res.status(204).send();
    },
  );

export default blogsRouter;
