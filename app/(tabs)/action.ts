"use server"

import db from "../lib/db";
import { TWEETS_PER_PAGE } from "../lib/constants";

export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      create_at: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    },
    skip: page * TWEETS_PER_PAGE,
    take: TWEETS_PER_PAGE + 1,
    orderBy: {
      create_at: "desc"
    }
  })
  return tweets
}

