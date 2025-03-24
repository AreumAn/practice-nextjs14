"use client";

import { useFormState } from 'react-dom';
import { addTweet } from '../actions/add-tweet';
import ButtonSm from './button-sm';
import { useEffect, useRef } from 'react';

export default function AddTweet({ onNewTweetAdded }: { onNewTweetAdded: () => void }) {
  const [state, action] = useFormState(addTweet, null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state && !state.fieldErrors) {
      onNewTweetAdded();
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
        textAreaRef.current.style.height = '5rem';
      }
    }
  }, [state, onNewTweetAdded]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    requestAnimationFrame(() => {
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  };

  return (
    <>
      <form action={action} className="flex flex-col gap-2 mb-2">
        <div className="flex flex-col gap-1">
          <textarea 
            ref={textAreaRef}
            name="tweet" 
            placeholder="What's new?" 
            className="w-full min-h-[5rem] p-2 rounded-md bg-neutral-900 border-none 
              placeholder:text-neutral-400 resize-none overflow-hidden 
              focus:outline-none focus:ring-2 focus:ring-neutral-700
              transition-all duration-500 ease-in-out"
            onInput={handleInput}
          />
          {state?.fieldErrors?.tweet?.map((error, i) => (
            <span key={i} className="text-red-500 text-sm pl-2">{error}</span>
          ))}
        </div>
        <div className="flex justify-end">
          <ButtonSm text="POST" style="primary" pendingText="POSTING..." />
        </div>
      </form>
    </>
  );
}
