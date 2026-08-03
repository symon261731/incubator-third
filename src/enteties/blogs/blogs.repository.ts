import { ObjectId } from "mongodb";
import { blogsCollection } from "../../db/collections";
import {
  Blog,
  BlogUpdateDTO,
  BlogWithId,
  CreateBlogDTO,
} from "./blogs.service";

interface BlogRepository {
  getAllBlogs: () => Promise<BlogWithId[]>;
  getBlogById: (id: string) => Promise<BlogWithId | null>;
  createBlog: (blog: CreateBlogDTO) => Promise<BlogWithId>;
  updateBlog: (id: string, blog: BlogUpdateDTO) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  deleteAllBlogs: () => Promise<boolean>;
}

export const blogRepository: BlogRepository = {
  getAllBlogs: async () => {
    return blogsCollection.find().toArray();
  },
  createBlog: async (blog: CreateBlogDTO) => {
    const newBlog: Blog = {
      isMembership: false,
      createdAt: new Date().toISOString(),
      ...blog,
    };

    const result = await blogsCollection.insertOne(newBlog);

    return { ...newBlog, _id: result.insertedId };
  },

  getBlogById: async (id: string) => {
    try {
      const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
      
      return blog;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateBlog: async (id: string, blog: BlogUpdateDTO) => {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: blog },
    );

    return updateResult.matchedCount > 0;
  },

  deleteBlog: async (id: string) => {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return deleteResult.deletedCount > 0;
  },

  deleteAllBlogs: async () => {
    const deleteResult = await blogsCollection.deleteMany({});
    return deleteResult.deletedCount > 0;
  },
};
