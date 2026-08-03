import * as z from "zod";

export const createUpdatePostSchema = z.object({
  title: z.string().trim().nonempty().max(30),
  shortDescription: z.string().trim().nonempty().max(100),
  content: z.string().trim().nonempty().max(1000),
  blogId: z.string(),
});

export const updatePostSchema = z.object({
  title: z.string().trim().nonempty().max(30),
  shortDescription: z.string().trim().nonempty().max(100),
  content: z.string().trim().nonempty().max(1000),
  blogId: z.string(),
});
