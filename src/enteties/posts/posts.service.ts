import { WithId } from "mongodb";

export interface Post {
  title: string;
  shortDescription: string;
  content: string;
  createdAt: string;
  blogId: string;
  blogName: string;
}

export interface PostResponse extends Post {
  id: string;
}

export type PostWithId = WithId<Post>;

export type CreatePostDTO = Omit<Post, "createdAt" | "blogName">;

export interface UpdatePostDTO {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}


