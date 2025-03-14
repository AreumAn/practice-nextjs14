"use server"
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().includes("@zod.com"),
  username: z.string().min(5, "Username should be at least 5 characters long"),
  password: z.string().min(10, "Password should be at least 10 characters long").regex(/.*[0-9].*/, "Password should contain at least one number(0123456789)"),
});

export async function formAction(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  }

  const result = formSchema.safeParse(data);
  console.log("result: ", result)
  if (!result.success) {
    return result.error.flatten()
  } else {
    return result
    console.log(result)
  }
  
  
}
