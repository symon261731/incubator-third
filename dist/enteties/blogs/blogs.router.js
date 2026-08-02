"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_repository_1 = require("./blogs.repository");
const middlewares_1 = require("../../middlewares");
const blogs_service_1 = require("./blogs.service");
const formatError_1 = require("../../helpers/formatError");
const blogsRouter = (0, express_1.Router)();
blogsRouter
    .get("/", (_, res) => {
    const blogs = blogs_repository_1.blogService.getAllBlogs();
    res.status(200).send(blogs);
})
    .get("/:id", (req, res) => {
    const blog = blogs_repository_1.blogService.getBlogById(req.params.id);
    if (Boolean(blog)) {
        res.status(200).send(blog);
    }
    else {
        res.status(404).send("Blog not found");
    }
})
    .post("", middlewares_1.authMiddleware, (req, res) => {
    const result = blogs_service_1.updateCreateBlogSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(result.error),
        });
        return;
    }
    const blog = blogs_repository_1.blogService.createBlog(result.data);
    res.status(201).send(blog);
})
    .put("/:id", middlewares_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("id is required");
        return;
    }
    const validateResult = blogs_service_1.updateCreateBlogSchema.safeParse(req.body);
    if (!validateResult.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(validateResult.error),
        });
        return;
    }
    const successUpdatedBlog = blogs_repository_1.blogService.updateBlog(id, validateResult.data);
    if (!successUpdatedBlog) {
        res.status(404).send("not found");
        return;
    }
    res.status(204).send();
})
    .delete("/:id", middlewares_1.authMiddleware, (req, res) => {
    const result = blogs_repository_1.blogService.deleteBlog(req.params.id);
    if (!result) {
        res.status(404).send("Blog not found");
        return;
    }
    res.status(204).send();
});
exports.default = blogsRouter;
