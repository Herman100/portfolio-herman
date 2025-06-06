import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./middleware/morgan.middleware.js";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morganMiddleware);

// Import routes
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import blogPostRoutes from "./routes/blog-post.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import uploadRoutes from "./routes/upload.route.js";

// using routes
app.use("/api/v1/healthcheck", healthcheckRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/posts", blogPostRoutes);
app.use("/api/v1/imagekit", uploadRoutes);

//handle errors
app.use(errorHandler);

export { app };
