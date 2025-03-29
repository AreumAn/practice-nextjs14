import ButtonSm from "@/app/components/button-sm"
import getSession from "@/app/lib/session"
import { formatDate } from "@/app/lib/utils"

import { notFound, redirect } from "next/navigation"
import db from "@/app/lib/db"
import LikeButton from "@/app/components/like-button"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { unstable_cache as nextCache } from "next/cache"
import { ChatBubbleBottomCenterIcon, TrashIcon } from "@heroicons/react/24/outline"
import Response from "@/app/components/response"
import { Prisma } from "@prisma/client"

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    select: {
      id: true,
      tweet: true,
      create_at: true,
      user_id: true,
      user: {
        select: {
          id: true,
          username: true
        }
      },
    },
    where: {
      id: id
    }
  })
  return tweet
}

async function getLikeStatus(tweet_id: number, session_id: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        user_id: session_id,
        tweet_id,
      }
    }
  })
  const likes = await db.like.count({
    where: {
      tweet_id,
    }
  })
  return { isLiked: Boolean(isLiked), likes }
}

function getCachedLikeStatus(tweet_id: number, session_id: number) {
  const cached = nextCache(getLikeStatus, ['tweet-like-status'], {
    tags: [`tweet-like-status-${tweet_id}`],
  })
  return cached(tweet_id, session_id)
}

async function getResponses(tweet_id:number) {
  const responses = await db.response.findMany({
    where: {
      tweet_id
    },
    orderBy: {
      create_at: "desc"
    },
    select: {
      id: true,
      response: true,
      create_at: true,
      user_id: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    }
  })
  return responses
}

export type ResponseType = Prisma.PromiseReturnType<typeof getResponses>[number]

export default async function TweetDetails({params: {id}}: {params: {id: string}}) {
  const tweet_id = Number(id)

  const tweet = await getTweet(tweet_id)
  if (!tweet) {
    return notFound()
  }
  const session = await getSession()
  const isOwner = session?.id === tweet.user_id

  const { isLiked, likes } = await getCachedLikeStatus(tweet_id, session.id!)

  const responses = await getResponses(tweet_id)
  console.log(responses)


  const handleDeleteTweet = async() => {
    "use server"
    await db.tweet.delete({
      where: {
        id: tweet_id
      }
    })
    redirect("/")
  }


  return (
    <div className="my-10 mx-4 flex flex-col gap-2 p-2 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="w-10 h-10" />
          <span className="text-white text-lg">{tweet.user.username}</span>
          <span className="text-gray-500 text-sm">{formatDate(tweet.create_at)}</span>
        </div>
        <div className="text-lg">{tweet.tweet}</div>
      </div>

      <div className="flex flex-col gap-4 border-neutral-600 border-b py-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex justify-center items-center gap-4">
            <LikeButton isLiked={isLiked} likes={likes} tweet_id={tweet_id} />
            <div className="flex justify-center items-center gap-2">
              <ChatBubbleBottomCenterIcon className="w-6 h-6" />
              {responses.length}
            </div>
          </div>
          
          {isOwner && (
            <form action={handleDeleteTweet}>
              <ButtonSm text="Delete" style="warning" pendingText="Deleting..." />
            </form>
          )}
        </div>
      </div>
      <Response responses={responses} session_id={session.id!} tweet_id={tweet_id} />
    </div>
  )
}
