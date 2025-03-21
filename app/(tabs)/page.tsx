import db from "@/app/lib/db"
import { Prisma } from "@prisma/client";
import { TWEETS_PER_PAGE } from "../lib/constants";
import TweetList from "../components/tweet-list";

async function getInitialTweets() {
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
    take: TWEETS_PER_PAGE,
    orderBy: {
      create_at: "desc"
    }
  })
  return tweets
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>

export default async function Home() {
  const initialTweets = await getInitialTweets()

  return (
    <div className="text-white">
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
