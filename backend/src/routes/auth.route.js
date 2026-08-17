import express from "express"
import { signupController } from "../controllers/auth.controller.js"
export const authRoutes = express.Router()
authRoutes.post("/signup", signupController)