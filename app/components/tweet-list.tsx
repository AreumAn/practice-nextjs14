"use client"

import { InitialTweets } from "@/app/(tabs)/page"
import ListProduct from "@/app/components/list-tweet"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { getTweetsByPage } from "@/app/(tabs)/action"
import { TWEETS_PER_PAGE } from "../lib/constants"

interface TweetListProps {
  initialTweets: InitialTweets
}

export default function TweetList({initialTweets}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets)
  const [page, setPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    const getTweetsbyPage = async () => {
      const fetchedTweets = await getTweetsByPage(page)
      const hasNext = fetchedTweets.length > TWEETS_PER_PAGE
      setTweets(fetchedTweets.slice(0, TWEETS_PER_PAGE))
      setHasNextPage(hasNext)
    }
    getTweetsbyPage()

  }, [page])

  const isFirstPage = page === 0

  return (
    <div className="flex flex-col gap-10">
      {tweets.map((tweet) => (
        <ListProduct key={tweet.id} tweet={tweet} />
      ))}

      <div className="flex items-center justify-between gap-4">
        {!isFirstPage && (
          <button onClick={() => setPage(page - 1)}>
            <ChevronLeftIcon className="fixed left-8 w-8 h-8 border-2 border-neutral-600 rounded-full p-1 hover:bg-neutral-600 transition-colors" />
          </button>
        )}
        {hasNextPage && (
          <button onClick={() => setPage(page + 1)}>
              <ChevronRightIcon className="fixed right-8 w-8 h-8 border-2 border-neutral-600 rounded-full p-1 hover:bg-neutral-600 transition-colors" />
          </button>
        )}
      </div>
    </div>
  )
}
