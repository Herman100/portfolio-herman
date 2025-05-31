export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "published";
};

export type PaginatedBlogs = {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
