import { PostResponse, PostWithId } from "./posts.service";

export function mapMongoPostToResponse(post: PostWithId): PostResponse {
  const { _id, ...otherProperties } = post;

  return {
    ...otherProperties,
    id: _id.toString(),
  };
}
