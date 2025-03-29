"use server"
import { z } from "zod";
import db from "../../lib/db";
import bcrypt from "bcrypt";
import getSession from "../../lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email().includes("@zod.com"),
  username: z.string().min(5, "Username should be at least 5 characters long"),
  password: z.string().min(10, "Password should be at least 10 characters long").regex(/.*[0-9].*/, "Password should contain at least one number(0123456789)"),
}).superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    }
  })
  if (!user) {
    ctx.addIssue({
      code: "custom",
      message: "email does not exist",
      path: ["email"],
      fatal: true
    })

    return z.NEVER;
  }
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  }

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten()
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id:true,
        username: true,
        password: true
      }
    })
    // check if username is correct
    if (user?.username !== result.data.username) {
      return {
        fieldErrors: {
          username: ["username is incorrect"],
          email:[]
        }
      }
    }
    // check if password is correct
    const passwordsMatch = await bcrypt.compare(result.data.password, user.password)
    if (!passwordsMatch) {
      return {
        fieldErrors: {
          password: ["password is incorrect"],
          email:[]
        }
      }
    }
    // login user
    const session = await getSession()
    session.id = user.id
    session.username = user.username
    await session.save()
    // redirect to profile
    redirect("/")
  }
  
  
}
