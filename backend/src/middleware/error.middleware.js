import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    if (error instanceof ZodError) {
        return res.status(422).json({
            success: false,
            message: error.issues.map((e) => e.message),
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};