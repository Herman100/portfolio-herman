import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

// Configure app

dotenv.config();
const PORT = process.env.PORT ?? 5000;

// Middleware

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the portfolio of Herman KB");
});

// Start the server

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
