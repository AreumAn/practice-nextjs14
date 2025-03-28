"use server"

import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { revalidateTag } from "next/cache";


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
