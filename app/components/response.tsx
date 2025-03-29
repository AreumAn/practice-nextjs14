"use client"

import { PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import { formatDate } from "../lib/utils"
import { ResponseType } from "../tweet/[id]/page"
import { addResponse } from "../tweet/[id]/action"
import { useFormState } from "react-dom"

interface ResponseProps {
  responses: ResponseType[]
  session_id: number
  tweet_id: number
}


export default function Response({responses, session_id, tweet_id}: ResponseProps) {
  const [state, action] = useFormState(addResponse, null)
  return (
      <div className="flex flex-col gap-4 text-neutral-300">
        <form action={action} className="flex flex-col gap-2">
          <input type="hidden" name="tweet_id" value={tweet_id} />
          <div className="flex gap-2">
            <input 
              type="text"
              name="response"
              placeholder="Add a response" 
              className="flex-1 bg-inherit border-neutral-600 border rounded-md p-2 focus:outline-none focus:ring-0 focus:border-neutral-300" />
            <button type="submit">
              <PlusCircleIcon className="w-8 h-8" />
            </button>
          </div>
          {state?.fieldErrors?.response && (
            <div className="text-red-500 w-full">{state.fieldErrors.response[0]}</div>
          )}
        </form>
        {responses.map((response) => (
          <div key={response.id} className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-6 h-6 mt-2" />
                <span className="text-lg font-bold">{response.user.username}</span>
                <span className="text-gray-500 text-sm">{formatDate(response.create_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                {session_id === response.user_id && (
                  <TrashIcon className="w-6 h-6" />
                )}
              </div>
            </div>
            <div className="ml-8 text-lg">{response.response}</div>
          </div>
        ))}
      </div>
  )
}
