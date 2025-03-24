"use client";

import { useFormStatus } from "react-dom";

const styleClasses = {
  primary: "hover:bg-neutral-400 hover:border-neutral-400 hover:text-neutral-900",
  warning: "bg-red-500 hover:bg-red-400 hover:border-red-400 hover:text-neutral-900",
}

interface ButtonProps {
  text: string;
  style: "primary" | "warning";
  pendingText?: string;
}

export default function ButtonSm({text, style, pendingText = "loading..."}: ButtonProps) {
  const {pending} = useFormStatus()
  return (
    <button 
      disabled={pending}
      className={`text-white border border-white px-4 py-2 rounded-full text-sm font-bold ${styleClasses[style]} ${pending ? "text-gray-400 bg-gray-100" : ""}`}
    >
      {pending ? pendingText : text}
    </button>
  )
}
