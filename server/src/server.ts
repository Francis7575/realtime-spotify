import app from "./app"
import { connectDB } from "./lib/db"
import { createServer } from "http";
import { initializeSocket } from "./lib/socket";    

const PORT = process.env.PORT

const httpServer = createServer(app);
initializeSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})