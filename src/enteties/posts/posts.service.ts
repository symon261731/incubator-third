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
  title: z.string().trim().nonempty().max(30),
  shortDescription: z.string().trim().nonempty().max(100),
  content: z.string().trim().nonempty().max(1000),
  blogId: z.string(),
});
