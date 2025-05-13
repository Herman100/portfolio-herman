import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./middlewares/morganHelper.js";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
// app.use(express.json());
app.use(morganMiddleware);

export { app };
