"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_repository_1 = require("./blogs.repository");
const middlewares_1 = require("../../middlewares");
const blogs_service_1 = require("./blogs.service");
const formatError_1 = require("../../helpers/formatError");
const blogsRouter = (0, express_1.Router)();
blogsRouter
    .get("/", (_, res) => {
    const blogs = blogs_repository_1.blogRepository.getAllBlogs();
    res.status(200).send(blogs);
})
    .get("/:id", (req, res) => {
    const blog = blogs_repository_1.blogRepository.getBlogById(req.params.id);
    if (Boolean(blog)) {
        res.status(200).send(blog);
    }
    else {
        res.status(404).send("Blog not found");
    }
})
    .post("", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = blogs_service_1.updateCreateBlogSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(result.error),
        });
        return;
    }
    const blog = yield blogs_repository_1.blogRepository.createBlog(result.data);
    res.status(201).send(blog);
}))
    .put("/:id", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("id is required");
        return;
    }
    const validateResult = blogs_service_1.updateBlogSchema.safeParse(req.body);
    if (!validateResult.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(validateResult.error),
        });
        return;
    }
    const successUpdatedBlog = yield blogs_repository_1.blogRepository.updateBlog(id, validateResult.data);
    if (!successUpdatedBlog) {
        res.status(404).send("not found");
        return;
    }
    res.status(204).send();
}))
    .delete("/:id", middlewares_1.authMiddleware, (req, res) => {
    const result = blogs_repository_1.blogRepository.deleteBlog(req.params.id);
    if (!result) {
        res.status(404).send("Blog not found");
        return;
    }
    res.status(204).send();
});
exports.default = blogsRouter;
