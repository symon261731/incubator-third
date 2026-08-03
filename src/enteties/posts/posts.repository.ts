import {
  UpdatePostDTO,
  CreatePostDTO,
  Post,
  PostWithId,
} from "./posts.service";
import { blogsCollection, postsCollection } from "../../db/collections";
import { ObjectId } from "mongodb";

interface PostRepository {
  getAllPosts: () => Promise<PostWithId[]>;
  createPost: (post: CreatePostDTO) => Promise<PostWithId>;
  getPostById: (id: string) => Promise<PostWithId | null>;
  updatePost: (id: string, post: UpdatePostDTO) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  deleteAllPosts: () => Promise<boolean>;
}

export const postRepository: PostRepository = {
  getAllPosts: async () => {
    const result = await postsCollection.find().toArray();
    return result;
  },

  createPost: async (post: CreatePostDTO) => {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(post.blogId) });

    const newPost: Post = {
      createdAt: new Date().toISOString(),
      ...post,
      blogName: blog?.name || "",
    };

    const result = await postsCollection.insertOne(newPost);

    return { ...newPost, _id: result.insertedId };
  },
  getPostById: async (id: string) => {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    return post;
  },

  updatePost: async (id: string, post: UpdatePostDTO) => {
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: post },
    );

    return result.matchedCount > 0;
  },
  deletePost: async (id: string) => {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
  },
  deleteAllPosts: async () => {
    const result = await postsCollection.deleteMany({});
    return result.deletedCount === 0;
  },
};
