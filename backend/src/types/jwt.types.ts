import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        email: string;
        role: string;
        iat?: number;
        exp?: number;
    };
}

export interface RefreshTokenPayload {
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
