import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./middleware/morgan.middleware.js";

const app = express();

const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [
    "http://localhost:3000",
    "http://localhost:3001",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            // Check against allowed origins
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            if (origin?.startsWith("http://localhost:")) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    console.log("Cookies:", req.headers.cookie);
    res.json({
        origin: req.headers.origin,
        cookies: req.headers.cookie,
    });
    next();
});

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
