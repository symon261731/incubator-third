import { ObjectId } from "mongodb";
import { blogsCollection } from "../../db/collections";
import { Blog, BlogCreateUpdateDTO } from "./blogs.service";

interface BlogService {
  blogs: Blog[];
  createBlog: (blog: BlogCreateUpdateDTO) => Promise<Blog>;
  getAllBlogs: () => Promise<Blog[]>;
  getBlogById: (id: string) => Promise<Blog | null>;
  updateBlog: (id: string, blog: BlogCreateUpdateDTO) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  deleteAllBlogs: () => Promise<boolean>;
}

export const blogRepository: BlogService = {
  blogs: [],

  getAllBlogs: async () => {
    return blogsCollection.find().toArray();
  },
  createBlog: async (blog: BlogCreateUpdateDTO) => {
    const newBlog: Blog = {
      id: new ObjectId().toString(),
      ...blog,
    };

    const createResult = await blogsCollection.insertOne(newBlog);

    return { ...newBlog, _id: createResult.insertedId };
  },

  getBlogById: async (id: string) => {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    return blog
  },

  updateBlog: async (id: string, blog: BlogCreateUpdateDTO) => {
    const index = blogService.blogs.findIndex((blog) => blog.id === id);
    if (index !== -1) {
      blogService.blogs[index] = { id, ...blog };
      return true;
    }
    return false;
  },

  deleteBlog: async (id: string) => {
    const index = blogService.blogs.findIndex((blog) => blog.id === id);
    if (index !== -1) {
      blogService.blogs.splice(index, 1);
      return true;
    }

    return false;
  },

  deleteAllBlogs: () => {
    blogService.blogs = [];
    return true;
  },
};
