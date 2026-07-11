import { CreateUpdatePostDTO, Post } from "../services/posts.service";

interface PostService {
  posts: Post[];
  createPost: (post: CreateUpdatePostDTO) => void;
  getPostById: (id: string) => Post | undefined;
  updatePost: (id: string, post: CreateUpdatePostDTO) => boolean;
  deletePost: (id: string) => boolean;
  deleteAllPosts: () => boolean;
}

export const postService: PostService = {
  posts: [],
  createPost: (post: CreateUpdatePostDTO) => {
    postService.posts.push({
      id: `${postService.posts.length + 1}`,
      ...post,
      blogName: "",
    });

    return postService.posts[postService.posts.length - 1];
  },
  getPostById: (id: string) => {
    return postService.posts.find((post) => post.id === id);
  },
  updatePost: (id: string, post: CreateUpdatePostDTO) => {
    const index = postService.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      postService.posts[index] = {
        ...postService.posts[index],
        ...post,
        id,
      };
      return true;
    }
    return false;
  },
  deletePost: (id: string) => {
    const index = postService.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      postService.posts.splice(index, 1);
      return true;
    }
    return false;
  },
  deleteAllPosts: () => {
    postService.posts = [];
    return true;
  },
};
