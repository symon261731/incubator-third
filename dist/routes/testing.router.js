"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_repository_1 = require("../enteties/blogs/blogs.repository");
const posts_repository_1 = require("../enteties/posts/posts.repository");
const testingRouter = (0, express_1.Router)();
testingRouter.delete("/all-data", (req, res) => {
    blogs_repository_1.blogService.deleteAllBlogs();
    posts_repository_1.postService.deleteAllPosts();
    res.status(204).send("All data deleted");
    console.log("All data deleted");
});
exports.default = testingRouter;
