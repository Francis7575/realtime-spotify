import express from "express"
import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"
import adminRoutes from "./routes/adminRoutes"
import songRoutes from "./routes/songRoutes"
import albumRoutes from "./routes/albumRoutes"
import statRoutes from "./routes/statRoutes"

const app = express()

app.use(express.json());
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

export default app


