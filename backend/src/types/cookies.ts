import { Request } from "express";

export interface RequestWithCookies extends Request {
  cookies: {
    refreshToken?: string;
    [key: string]: string | undefined;
  };
}
