"use server"

import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { revalidateTag } from "next/cache";
import { z } from "zod";


export async function toggleLike(tweet_id: number) {
  try {
    const session = await getSession();
    
    const existingLike = await db.like.findUnique({
      where: {
        id: {
          user_id: session.id!,
          tweet_id
        }
      }
    });
    
    if (existingLike) {
      await db.like.delete({
        where: {
          id: {
            user_id: session.id!,
            tweet_id
          }
        }
      });
    } else {
      await db.like.create({
        data: {
          user_id: session.id!,
          tweet_id
        }
      });
    }
    revalidateTag(`tweet-like-status-${tweet_id}`)
  } catch (error) {
    throw error;
  }
}


const formSchema = z.object({
  response: z.string().nonempty("Response should be at least 1 character long").max(50, "Response should be at most 50 characters long")
})

export async function addResponse(prevState: any, formData: FormData) {
  const data = {
    response: formData.get("response"),
    tweet_id: Number(formData.get("tweet_id"))
  }
  
  const result = formSchema.safeParse(data)

  if (!result.success) {
    console.log(result.error.flatten())
    return result.error.flatten()
  } else {
    const session = await getSession();
    await db.response.create({
      data: {
        response: result.data.response,
        user_id: session.id!,
        tweet_id: data.tweet_id
      }
    })
  }

  console.log(data)
}
