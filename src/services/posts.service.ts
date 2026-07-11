import * as z from "zod";

export interface Post {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

export interface CreateUpdatePostDTO {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export const createUpdatePostSchema = z.object({
  title: z.string().max(30),
  shortDescription: z.string().max(100),
  content: z.string().max(1000),
  blogId: z.string(),
});
