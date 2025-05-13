import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import morganMiddleware from "./middlewares/morganHelper.js";
import { app } from "./app.js";

// Configure app

dotenv.config();
const PORT = process.env.PORT ?? 3000;

app.use(morganMiddleware);

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
