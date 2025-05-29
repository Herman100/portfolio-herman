export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
