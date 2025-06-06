export interface BlogPost {
  _id: string;
  title: string;
  coverImage?: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostDto {
  title: string;
  coverImage?: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
}

export interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {}

export interface PaginatedBlogPosts {
  blogs: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
