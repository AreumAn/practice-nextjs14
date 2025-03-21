import { UserCircleIcon } from "@heroicons/react/24/solid"
import { formatDate } from "../lib/utils"
import { InitialTweets } from "../(tabs)/page"
import Link from "next/link"


interface ListTweetProps {
  tweet: InitialTweets[number]
}

export default function ListTweet({tweet}: ListTweetProps) {
  return (
    <Link href={`/tweet/${tweet.id}`} key={tweet.id} className="flex flex-col border-neutral-500 gap-2 border rounded-lg p-4 hover:border-neutral-200 transition-colors">
      <div className="text-gray-500 font-bold flex items-center justify-between gap-5">
        <div className="flex items-center justify-center gap-2">
          <UserCircleIcon className="w-10 h-10" />
          <span className="text-white text-lg">{tweet.user.username}</span>
        </div>
        <span className="text-gray-500 text-sm">{formatDate(tweet.create_at)}</span>
      </div>
      <div className="text-lg">{tweet.tweet}</div> 
    </Link>
  )
}
