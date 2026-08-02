import { ObjectId } from "mongodb";
import { blogsCollection } from "../../db/collections";
import { Blog, BlogCreateUpdateDTO, CreateBlogDTO } from "./blogs.service";

interface BlogRepository {
  createBlog: (blog: BlogCreateUpdateDTO) => Promise<Blog>;
  getAllBlogs: () => Promise<Blog[]>;
  getBlogById: (id: string) => Promise<Blog | null>;
  updateBlog: (id: string, blog: BlogCreateUpdateDTO) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  deleteAllBlogs: () => Promise<boolean>;
}

export const blogRepository: BlogRepository = {
  getAllBlogs: async () => {
    return blogsCollection.find().toArray();
  },
  createBlog: async (blog: CreateBlogDTO) => {
    const newBlog: Blog = {
      id: new ObjectId().toString(),
      createdAt: new Date().toISOString(),
      ...blog,
    };

    const createResult = await blogsCollection.insertOne(newBlog);

    return { ...newBlog, _id: createResult.insertedId };
  },

  getBlogById: async (id: string) => {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return blog;
  },

  updateBlog: async (id: string, blog: BlogCreateUpdateDTO) => {
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
