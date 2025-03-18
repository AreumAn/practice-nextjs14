"use server"
import { z } from "zod";
import db from "../lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "../lib/session";
const checkPasswords = ({password, confirmPassword}: {password: string, confirmPassword: string }) => password === confirmPassword


const formSchema = z.object({
  email: z.string().email().includes("@zod.com"),
  username: z.string().min(5, "Username should be at least 5 characters long"),
  password: z.string().min(10, "Password should be at least 10 characters long").regex(/.*[0-9].*/, "Password should contain at least one number(0123456789)"),
  confirmPassword: z.string()
  }).superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true
      }
    })
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "email already exists",
        path: ["email"],
        fatal: true
      })

      return z.NEVER;
    }
  }).superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        id: true
      }
    })
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "username already exists",
        path: ["username"],
        fatal: true
      })

      return z.NEVER;
    }
  }).refine(checkPasswords, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  }

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten()
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12)
    // save user to db
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword
      }
    })
    // login user
    const session = await getSession()
    session.id = user.id
    await session.save()
    redirect("/profile")
  }
  
  
}
