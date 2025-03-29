"use client"

import { PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"
import { formatDate } from "../lib/utils"
import { ResponseType } from "../tweet/[id]/page"
import { addResponse, deleteResponse } from "../tweet/[id]/action"
import { useFormState } from "react-dom"
import { startTransition, useOptimistic, useRef } from 'react'

interface ResponseProps {
  responses: ResponseType[]
  session_id: number
  session_username: string
  tweet_id: number
}

type OptimisticAction = 
  | { type: 'add'; response: ResponseType }
  | { type: 'delete'; id: number }


export default function Response({responses, session_id, session_username, tweet_id}: ResponseProps) {
  const [state, action] = useFormState(addResponse, null)
  const responseInputRef = useRef<HTMLInputElement>(null)
  const [responseState, reducerFn] = useOptimistic(
    responses,
    (previousState: ResponseType[], payload: OptimisticAction) => {
      switch (payload.type) {
        case 'add':
          return [payload.response, ...previousState]
        case 'delete':
          return previousState.filter(response => response.id !== payload.id)
      }
    }
  )

  const addResponseAction = async (formData: FormData) => {
    startTransition(() => {
      reducerFn({
        type: 'add',
        response: {
          response: formData.get('response') as string,
          id: -Date.now(),
          create_at: new Date(),
          user_id: session_id!,
          user: {
            id: session_id!,
            username: session_username!
          }
        }
      });
    });
    await action(formData);
    if (responseInputRef.current) {
      responseInputRef.current.value = '';
    }
  }

  const handleDelete = async (response_id: number, tweet_id: number) => {
    startTransition(() => {
      reducerFn({
        type: 'delete',
        id: response_id
      });
    });
    await deleteResponse(response_id, tweet_id);
  }

  return (
      <div className="flex flex-col gap-4 text-neutral-300">
        <form action={addResponseAction} className="flex flex-col gap-2">
          <input type="hidden" name="tweet_id" value={tweet_id} />
          <div className="flex gap-2">
            <input 
              ref={responseInputRef}
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
        {responseState.map((response) => (
          <div key={response.id || -Date.now()} className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-6 h-6 mt-2" />
                <span className="text-lg font-bold">{response.user.username}</span>
                <span className="text-gray-500 text-sm">{formatDate(response.create_at)}</span>
              </div>
              <button onClick={() => handleDelete(response.id, tweet_id)} className="flex items-center gap-2">
                {session_id === response.user_id && (
                  <TrashIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            <div className="ml-8 text-lg">{response.response}</div>
          </div>
        ))}
      </div>
  )
}
