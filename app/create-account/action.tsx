"use server"
import { z } from "zod";
import db from "../lib/db";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const checkPasswords = ({password, confirmPassword}: {password: string, confirmPassword: string }) => password === confirmPassword

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true
    }
  })
  return !Boolean(user)
}

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username: username
    },
    select: {
      id: true
    }
  })
  return !Boolean(user)
}

const formSchema = z.object({
  email: z.string().email().includes("@zod.com").refine(checkEmail, {
    message: "Email already exists"
  }),
  username: z.string().min(5, "Username should be at least 5 characters long").refine(checkUsername, {
    message: "Username already exists"
  }),
  password: z.string().min(10, "Password should be at least 10 characters long").regex(/.*[0-9].*/, "Password should contain at least one number(0123456789)"),
  confirmPassword: z.string()
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
    const cookie = await getIronSession(cookies(), {
      cookieName: "practice-nextjs",
      password: process.env.COOKIE_PASSWORD!
    })
    // @ts-ignore
    cookie.id = user.id
    await cookie.save()
    redirect("/profile")
  }
  
  
}
