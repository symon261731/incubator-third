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
    getAllBlogs: () => __awaiter(void 0, void 0, void 0, function* () {
        return collections_1.blogsCollection.find().toArray();
    }),
    createBlog: (blog) => __awaiter(void 0, void 0, void 0, function* () {
        const newBlog = Object.assign({ id: new mongodb_1.ObjectId().toString(), createdAt: new Date().toISOString() }, blog);
        const createResult = yield collections_1.blogsCollection.insertOne(newBlog);
        return Object.assign(Object.assign({}, newBlog), { _id: createResult.insertedId });
    }),
    getBlogById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield collections_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return blog;
    }),
    updateBlog: (id, blog) => __awaiter(void 0, void 0, void 0, function* () {
        const updateResult = yield collections_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: blog });
        return updateResult.matchedCount > 0;
    }),
    deleteBlog: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResult = yield collections_1.blogsCollection.deleteOne({
            _id: new mongodb_1.ObjectId(id),
        });
        return deleteResult.deletedCount > 0;
    }),
    deleteAllBlogs: () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResult = yield collections_1.blogsCollection.deleteMany({});
        return deleteResult.deletedCount > 0;
    }),
};
