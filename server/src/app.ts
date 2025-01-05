import express, { Request, Response, NextFunction }  from "express";
import { clerkClient, clerkMiddleware } from "@clerk/express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import path from "path";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import songRoutes from "./routes/songRoutes";
import albumRoutes from "./routes/albumRoutes";
import statRoutes from "./routes/statRoutes";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

const options = {
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
};

app.use(express.json()); // allow to parse req.body
app.use(clerkMiddleware(options)); // this will add auth to the request object

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB  max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

export default app;
