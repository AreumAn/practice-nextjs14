"use client";

import { useFormStatus } from "react-dom";

interface FormBtnProps {
  text: string;
}

export default function FormBtn({ text }: FormBtnProps) {
  const {pending} = useFormStatus()
  return (
    <button 
      disabled={pending}
      className="bg-gray-200 rounded-full px-4 py-3 font-bold disabled:text-gray-400"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
