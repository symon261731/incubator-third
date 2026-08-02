"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
exports.postService = {
    posts: [],
    createPost: (post) => {
        exports.postService.posts.push(Object.assign(Object.assign({ id: `${exports.postService.posts.length + 1}` }, post), { blogName: "" }));
        return exports.postService.posts[exports.postService.posts.length - 1];
    },
    getPostById: (id) => {
        return exports.postService.posts.find((post) => post.id === id);
    },
    updatePost: (id, post) => {
        const index = exports.postService.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            exports.postService.posts[index] = Object.assign(Object.assign(Object.assign({}, exports.postService.posts[index]), post), { id });
            return true;
        }
        return false;
    },
    deletePost: (id) => {
        const index = exports.postService.posts.findIndex((post) => post.id === id);
        if (index !== -1) {
            exports.postService.posts.splice(index, 1);
            return true;
        }
        return false;
    },
    deleteAllPosts: () => {
        exports.postService.posts = [];
        return true;
    },
};
