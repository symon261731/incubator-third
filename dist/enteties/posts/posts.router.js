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
const middlewares_1 = require("../../middlewares");
const posts_repository_1 = require("./posts.repository");
const schema_1 = require("./validation/schema");
const formatError_1 = require("../../helpers/formatError");
const posts_mappers_1 = require("./posts.mappers");
const postsRouter = (0, express_1.Router)();
postsRouter
    .get("", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repository_1.postRepository.getAllPosts();
    console.log("posts list", posts);
    res.status(200).send(posts.map((post) => (0, posts_mappers_1.mapMongoPostToResponse)(post)));
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield posts_repository_1.postRepository.getPostById(id);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    console.log(`route get post/${post === null || post === void 0 ? void 0 : post._id}`, post);
    res.status(200).send((0, posts_mappers_1.mapMongoPostToResponse)(post));
}))
    .post("", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = schema_1.createUpdatePostSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(result.error),
        });
        return;
    }
    const post = yield posts_repository_1.postRepository.createPost(result.data);
    console.log(`route create post`, post);
    res.status(201).send((0, posts_mappers_1.mapMongoPostToResponse)(post));
}))
    .put("/:id", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = schema_1.updatePostSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            errorsMessages: (0, formatError_1.formatError)(result.error),
        });
        return;
    }
    const isPostUpdated = yield posts_repository_1.postRepository.updatePost(id, result.data);
    if (!isPostUpdated) {
        res.status(404).send("Post not found");
        return;
    }
    res.status(204).send();
}))
    .delete("/:id", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_repository_1.postRepository.deletePost(req.params.id);
    console.log(`route delete post/${req.params.id}`, result);
    if (!result) {
        res.status(404).send("Post not found");
        return;
    }
    res.status(204).send();
}));
exports.default = postsRouter;
