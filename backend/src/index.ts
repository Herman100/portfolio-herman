import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import morganMiddleware from "./middlewares/morganHelper.js";
import { app } from "./app.js";

// Configure app

dotenv.config();
const PORT = process.env.PORT ?? 3000;

// Middleware

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
