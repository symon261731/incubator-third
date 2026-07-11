import { Blog, BlogCreateUpdateDTO } from "../services/blogs.service";

interface BlogService {
  blogs: Blog[];
  createBlog: (blog: BlogCreateUpdateDTO) => Blog;
  getAllBlogs: () => Blog[];
  getBlogById: (id: string) => Blog | undefined;
  updateBlog: (id: string, blog: BlogCreateUpdateDTO) => boolean;
  deleteBlog: (id: string) => boolean;
}

export const blogService: BlogService = {
  blogs: [],

  getAllBlogs: () => {
    return blogService.blogs;
  },
  createBlog: (blog: BlogCreateUpdateDTO) => {
    blogService.blogs.push({ ...blog, id: `${blogService.blogs.length + 1}` });
    return blogService.blogs[blogService.blogs.length - 1];
  },

  getBlogById: (id: string) => {
    return blogService.blogs.find((blog) => blog.id === id);
  },

  updateBlog: (id: string, blog: BlogCreateUpdateDTO) => {
    const index = blogService.blogs.findIndex((blog) => blog.id === id);
    if (index !== -1) {
      blogService.blogs[index] = { id, ...blog };
      return true;
    }
    return false;
  },

  deleteBlog: (id: string) => {
    const index = blogService.blogs.findIndex((blog) => blog.id === id);
    if (index !== -1) {
      blogService.blogs.splice(index, 1);
      return true;
    }

    return false;
  },
};
