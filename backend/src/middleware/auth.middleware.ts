// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { RefreshTokenPayload } from "../types/jwt.types.js";

// dotenv.config();

// // Get JWT secret from environment variables
// const access_secret =
//     process.env.JWT_ACCESS_TOKEN_SECRET ?? "your-access-secret-key";
// const refresh_secret =
//     process.env.JWT_REFRESH_TOKEN_SECRET ?? "your-refresh-secret-key";

// // Generate a JWT token
// export const generateAccessToken = (payload: {
//     _id: mongoose.Types.ObjectId;
//     email: string;
//     role: string;
// }) => {
//     return jwt.sign(payload, access_secret, {
//         algorithm: "HS256",
//         expiresIn: "15m",
//     });
// };

// export const generateRefreshToken = (payload: {
//     _id: mongoose.Types.ObjectId;
//     email: string;
//     role: string;
// }) => {
//     return jwt.sign(payload, refresh_secret, {
//         algorithm: "HS256",
//     });
// };

// export const verifyRefreshToken = (
//     token: string
// ): RefreshTokenPayload | null => {
//     try {
//         const user = jwt.verify(token, refresh_secret) as RefreshTokenPayload;
//         return user;
//     } catch (error) {
//         console.error("Error verifying refresh token:", error);
//         return null;
//     }
// };

// // Verify JWT token middleware
// export const verifyAccessToken = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         // Get the authorization header
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res
//                 .status(401)
//                 .json({ message: "Authorization header missing" });
//         }

//         // Check if it follows the Bearer TOKEN format
//         if (!authHeader.startsWith("Bearer ")) {
//             return res
//                 .status(401)
//                 .json({ message: "Invalid token format. Use 'Bearer TOKEN'" });
//         }

//         // Extract the token
//         const token = authHeader.split(" ")[1];
//         console.log("Extracted JWT:", token);

//         if (!token) {
//             return res.status(401).json({ message: "Token missing" });
//         }

//         // Verify and decode the token
//         const decoded = jwt.verify(token, access_secret) as Request["user"];

//         console.log("Decoded JWT:", decoded);

//         // Attach user data to request object for use in route handlers
//         req.user = decoded;

//         // Continue to the next middleware or route handler
//         next();
//     } catch (error) {
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(401).json({ message: "Invalid token" });
//         } else if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({ message: "Token expired" });
//         } else {
//             console.error("JWT verification error:", error);
//             return res
//                 .status(500)
//                 .json({ message: "Server error during authentication" });
//         }
//     }
// };
