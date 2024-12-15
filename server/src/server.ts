import app from "./app"
import { connectDB } from "./lib/db"

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})