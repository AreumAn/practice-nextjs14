"use server"

import { redirect } from 'next/navigation';
import { z } from "zod";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";

const formSchema = z.object({
  tweet: z.string().min(1, "Tweet should be at least 1 character long").max(140, "Tweet should be less than 140 characters"),
}); 

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  }

  const session = await getSession()
  if (!session) {
    redirect("/log-in")
    return;
  }

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten()
  } else {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      
    });
    redirect(`/tweet/${tweet.id}`);
  }
}
