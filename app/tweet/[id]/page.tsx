import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { formatDate } from "@/app/lib/utils"
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid, UserCircleIcon } from "@heroicons/react/24/solid"
import { notFound } from "next/navigation"


async function getTweet(id: string) {
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
      likes: {
        select: {
          user: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }
    },
    where: {
      id: Number(id)
    }
  })
  return tweet
}


export default async function TweetDetails({params: {id}}: {params: {id: string}}) {
  const tweet = await getTweet(id)
  if (!tweet) {
    return notFound()
  }
  const session = await getSession()
  const isOwner = session?.id === tweet.user_id
  const isLiked = tweet.likes.some((like) => like.user.id === session?.id)

  return (
    <div className="my-10 mx-4 flex flex-col gap-10 p-2 text-white border-gray-200 border rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="w-10 h-10" />
          <span className="text-white text-lg">{tweet.user.username}</span>
          <span className="text-gray-500 text-sm">{formatDate(tweet.create_at)}</span>
        </div>
        <div className="text-lg">{tweet.tweet}</div>
      </div>

      <div className="flex flex-col gap-4">
        <hr className="border-gray-200" />
        <div className="flex items-center gap-2 justify-between">
          <div className="flex justify-center items-center gap-px">
            {isLiked ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIconOutline className="w-6 h-6" />
            )}
            <span className="text-gray-200 text-sm">{tweet.likes.length}</span>
          </div>
          {isOwner && (
            <button className="text-gray-200 text-sm bg-red-500 rounded-md px-2 py-1">Delete</button>
          )}
        </div>
      </div>
    </div>
  )
}
