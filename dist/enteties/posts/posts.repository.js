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
exports.postRepository = void 0;
const collections_1 = require("../../db/collections");
const mongodb_1 = require("mongodb");
exports.postRepository = {
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collections_1.postsCollection.find().toArray();
        return result;
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield collections_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(post.blogId) });
        const newPost = Object.assign(Object.assign({ createdAt: new Date().toISOString() }, post), { blogName: (blog === null || blog === void 0 ? void 0 : blog.name) || "" });
        const result = yield collections_1.postsCollection.insertOne(newPost);
        return Object.assign(Object.assign({}, newPost), { _id: result.insertedId });
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield collections_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return post;
    }),
    updatePost: (id, post) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collections_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: post });
        return result.matchedCount > 0;
    }),
    deletePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collections_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount > 0;
    }),
    deleteAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collections_1.postsCollection.deleteMany({});
        return result.deletedCount === 0;
    }),
};
