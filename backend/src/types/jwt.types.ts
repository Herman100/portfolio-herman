import mongoose from "mongoose";

export interface RefreshTokenPayload {
    email: string;
    role: string;
    _id: mongoose.Types.ObjectId;
    iat?: number;
    exp?: number;
}
