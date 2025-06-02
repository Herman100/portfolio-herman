export type BlogPost = {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBlogPostDto = {
  title: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
};

export type UpdateBlogPostDto = Partial<CreateBlogPostDto>;

export type PaginatedBlogPosts = {
  blogs: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
