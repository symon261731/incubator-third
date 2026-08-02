import { CreateUpdatePostDTO, CreatePostDTO, Post } from "./posts.service";
import { postsCollection } from "../../db/collections";
import { ObjectId, WithId } from "mongodb";

interface PostRepository {
  getAllPosts: () => Promise<Post[]>;
  createPost: (post: CreatePostDTO) => Promise<WithId<Post>>;
  getPostById: (id: string) => Promise<Post | null>;
  updatePost: (id: string, post: CreateUpdatePostDTO) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  deleteAllPosts: () => Promise<boolean>;
}

export const postRepository: PostRepository = {
  getAllPosts: async () => {
    const result = await postsCollection.find().toArray();
    return result;
  },

  createPost: async (post: CreatePostDTO) => {
    const newPost: Post = {
      id: new ObjectId().toString(),
      createdAt: new Date().toISOString(),
      ...post,
    };
    const result = await postsCollection.insertOne(newPost);

    return { ...newPost, _id: result.insertedId };
  },
  getPostById: async (id: string) => {
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    return post;
  },

  updatePost: async (id: string, post: CreateUpdatePostDTO) => {
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
