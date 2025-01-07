import app from "./app"
import { connectDB } from "./lib/db"
import { createServer } from "http";
import { initializeSocket } from "./lib/socket";    
import { Request, Response } from "express";

const PORT = process.env.PORT
// Added on cron-job to ping the server every 10 mins to avoid the server sleep on render for inactivity
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("Test route working");
});

const httpServer = createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})