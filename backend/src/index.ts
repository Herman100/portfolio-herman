import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.js";
import morganMiddleware from "./middlewares/morganHelper.js";

// Configure app
const app = express();
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
