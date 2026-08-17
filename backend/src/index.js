import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import { authRoutes } from "./routes/auth.route.js"
import { errorHandler } from "./middleware/error.middleware.js"
const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/health", (_req, res) => {
    res.json({ status: "backend running" })
})
app.use("/api/v1/auth", authRoutes)

app.use(errorHandler)
const PORT = process.env.PORT || "8030"

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})