"use client";

import { useFormState } from 'react-dom';
import { addTweet } from '../actions/add-tweet';
import ButtonSm from './button-sm';

export default function AddTweet() {
  const [state, action] = useFormState(addTweet, null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <form action={action} className="flex flex-col gap-2 mb-10">
        <div className="flex flex-col gap-1">
          <textarea 
            name="tweet" 
            placeholder="What's new?" 
            className="w-full min-h-[5rem] p-2 rounded-md bg-neutral-900 border-none 
              placeholder:text-neutral-400 resize-none overflow-hidden 
              focus:outline-none focus:ring-2 focus:ring-neutral-700"
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
