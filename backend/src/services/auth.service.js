import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.ts";
import { AppError } from "./../utils/AppError.js";
export const signupService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const salt = 12;
    const passwordHash = await bcrypt.hash(password, salt);
    const verificationToken = String(
      Math.floor(100000 + Math.random() * 900000),
    );
    const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        verificationToken,
        verificationTokenExpiry,
      },
    });
    return newUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(error.meta);
        throw new AppError(
          "cannot create an account with provided details",
          409,
        );
      }
    }
    throw new AppError("internal server error", 500);
  }
};
