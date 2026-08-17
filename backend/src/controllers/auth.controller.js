import { signUpSchema } from "../schema/auth.schema.js"
import { signupService } from "../services/auth.service.js"
import { AppError } from "../utils/AppError.js"
// signup
export const signupController = async (req, res, next) => {
    try {
        const validateData = signUpSchema.safeParse(req.body)
        if (!validateData.success) {
            throw new AppError("invalid input data", 422, validateData.error.flatten())
        }
        const newUser = await signupService(validateData.data)
        res.status(201).json({ success: true, message: "user created successfully", data: newUser })
    } catch (error) {
        next(error)
    }
}