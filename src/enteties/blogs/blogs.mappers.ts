import { BlogResponse, BlogWithId } from "./blogs.service";

export function mapMongoBlogToResponse(blog: BlogWithId): BlogResponse {
    const { _id, ...rest } = blog;

    return {
        ...rest,
        id: _id.toString(),
    }
}