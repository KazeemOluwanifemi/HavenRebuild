import "dotenv/config"
import express from "express"
const app = express()
app.use(express.json())

app.get("/health", (_req, res) => {
    res.json({ status: "backend running" })
})

const PORT = process.env.PORT || "8030"

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})