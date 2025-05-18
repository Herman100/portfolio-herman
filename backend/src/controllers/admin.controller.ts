import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

import { Admin } from "../models/admin.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../types/jwt.types.js";
import { verifyRefreshToken } from "../middleware/jwt.middleware.js";
import { RequestWithCookies } from "../types/cookies.js";

const adminController = {
    // Register a new admin
    register: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { name, email, password, role } = req.body;

            // Check if the admin already exists
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                throw new ApiErrorHandler(
                    400,
                    "Admin already exists",
                    "Admin Registration Error"
                );
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new admin
            const newAdmin = new Admin({
                name,
                email,
                password: hashedPassword,
                role,
            });

            await newAdmin.save();

            // Send response
            res.status(201).json(
                new ApiResponse(
                    201,
                    "Admin registered successfully",
                    "Admin registered successfully"
                )
            );
        }
    ),
    // Login admin
    login: asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiErrorHandler(
                401,
                "Invalid email or password",
                "Admin Login Error"
            );
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new ApiErrorHandler(
                401,
                "Invalid email or password",
                "Admin Login Error"
            );
        }

        // Generate access and refresh tokens
        const accessToken = generateAccessToken({
            email: admin.email,
            role: admin.role,
        });
        const refreshToken = generateRefreshToken({
            email: admin.email,
            role: admin.role,
        });

        // Update the admin's refresh token in the database
        admin.refreshToken = refreshToken;
        await admin.save();

        // Set the refresh token in the cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // secure in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/",
        });

        // Send response
        res.status(200).json(
            new ApiResponse(
                200,
                {
                    accessToken,
                },
                "Admin logged in successfully"
            )
        );
    }),

    // Refresh token
    refreshToken: asyncHandler(
        async (req: RequestWithCookies, res: Response): Promise<void> => {
            console.log(req.cookies);
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new ApiErrorHandler(
                    401,
                    "Refresh token is required",
                    "Authentication Error"
                );
            }

            // Verify the refresh token
            const decoded = verifyRefreshToken(refreshToken);
            if (!decoded) {
                throw new ApiErrorHandler(
                    401,
                    "Invalid refresh token",
                    "Refresh Token Error"
                );
            }

            // Generate new access and refresh tokens
            const accessToken = generateAccessToken({
                email: decoded.email,
                role: decoded.role,
            });

            // Send response
            res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                    },
                    "Tokens refreshed successfully"
                )
            );
        }
    ),

    // Logout admin
    logout: asyncHandler(
        async (req: AuthRequest, res: Response): Promise<void> => {
            const { refreshToken } = req.cookies;

            // Verify the refresh token
            const decoded = verifyRefreshToken(refreshToken);
            if (!decoded) {
                throw new ApiErrorHandler(
                    401,
                    "Invalid refresh token",
                    "Logout Error"
                );
            }

            // Find the admin by email
            const admin = await Admin.findOne({ email: decoded.email });
            if (!admin) {
                throw new ApiErrorHandler(
                    404,
                    "Admin not found",
                    "Logout Error"
                );
            }
            // Clear the refresh token in the database
            admin.refreshToken = "";
            await admin.save();

            // Send response
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            res.status(200).json(
                new ApiResponse(200, null, "Admin logged out successfully")
            );
        }
    ),
};
export default adminController;
