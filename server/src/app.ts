import express from "express";
import { clerkMiddleware } from "@clerk/express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import songRoutes from "./routes/songRoutes";
import albumRoutes from "./routes/albumRoutes";
import statRoutes from "./routes/statRoutes";
import dotenv from "dotenv"

dotenv.config()
const app = express();

const options = {
  secretKey: process.env.CLERK_ENCRYPTION_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
};

app.use(express.json()); // allow to parse req.body
app.use(clerkMiddleware(options)); // this will add auth to the request object

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(morgan("dev"));

export default app;
