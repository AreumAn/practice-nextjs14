"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const {pending} = useFormStatus()
  return (
    <button 
      disabled={pending}
      className="bg-gray-400 rounded-full px-4 py-3 font-bold disabled:text-gray-400"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
