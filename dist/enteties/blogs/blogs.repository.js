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
exports.blogRepository = void 0;
const mongodb_1 = require("mongodb");
const collections_1 = require("../../db/collections");
exports.blogRepository = {
    blogs: [],
    getAllBlogs: () => __awaiter(void 0, void 0, void 0, function* () {
        return collections_1.blogsCollection.find().toArray();
    }),
    createBlog: (blog) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = Object.assign({ id: new mongodb_1.ObjectId().toString() }, blog);
        const createResult = yield collections_1.blogsCollection.insertOne(newBlog);
        return Object.assign(Object.assign({}, newBlog), { _id: createResult.insertedId });
    }),
    getBlogById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield collections_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return blog;
    }),
    updateBlog: (id, blog) => __awaiter(void 0, void 0, void 0, function* () {
        const index = blogService.blogs.findIndex((blog) => blog.id === id);
        if (index !== -1) {
            blogService.blogs[index] = Object.assign({ id }, blog);
            return true;
        }
        return false;
    }),
    deleteBlog: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const index = blogService.blogs.findIndex((blog) => blog.id === id);
        if (index !== -1) {
            blogService.blogs.splice(index, 1);
            return true;
        }
        return false;
    }),
    deleteAllBlogs: () => {
        blogService.blogs = [];
        return true;
    },
};
