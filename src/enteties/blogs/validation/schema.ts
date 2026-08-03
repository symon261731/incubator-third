import * as z from "zod";

const websiteUrlSchema = z
  .string()
  .max(100)
  .regex(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/);

export const updateCreateBlogSchema = z.object({
  name: z.string().trim().nonempty().max(15),
  description: z.string().max(500),
  websiteUrl: websiteUrlSchema,
});

export const updateBlogSchema = z.object({
  name: z.string().trim().nonempty().max(15),
  description: z.string().max(500),
  websiteUrl: websiteUrlSchema,
});
