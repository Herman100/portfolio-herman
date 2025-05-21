import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: mongoose.Types.ObjectId;
                email: string;
                role: string;
                iat?: number;
                exp?: number;
            };
        }
    }
}
