import { Request } from "express";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
    user?: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        role: string;
        iat?: number;
        exp?: number;
    };
}

export interface RefreshTokenPayload {
    email: string;
    role: string;
    _id: mongoose.Schema.Types.ObjectId;
    iat?: number;
    exp?: number;
}
