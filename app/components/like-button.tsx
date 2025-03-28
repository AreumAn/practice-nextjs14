"use client"

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { startTransition, useOptimistic } from "react"
import { toggleLike, } from "../tweet/[id]/action"

interface LikeButtonProps {
  isLiked: boolean,
  likes: number,
  tweet_id: number
}

export default function LikeButton({
  isLiked,
  likes,
  tweet_id
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic({ isLiked, likes},
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likes: previousState.isLiked
        ? previousState.likes - 1
        : previousState.likes + 1,
    })
  )
  const handleLike = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    await toggleLike(tweet_id);
  }
  
  return (
    <button onClick={handleLike} className="flex gap-1">
      {state.isLiked ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" />
          ) : (
          <HeartIconOutline className="w-6 h-6" />
      )}
      <span className="text-gray-200 text-sm">{state.likes}</span>
    </button>
  )
}
