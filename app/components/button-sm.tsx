"use client";

import { useFormStatus } from "react-dom";

const styleClasses = {
  primary: "hover:bg-neutral-400 hover:border-neutral-400 hover:text-neutral-900 border-white" ,
  warning: "bg-red-500 border-red-500 hover:bg-red-900 hover:border-red-900 hover:text-neutral-900",
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
      className={`text-white border  px-4 py-2 rounded-full text-sm font-bold 
        ${styleClasses[style]} 
        ${pending ? style == "primary" ? "text-gray-400 bg-gray-100" : "bg-red-900" : ""}`}
    >
      {pending ? pendingText : text}
    </button>
  )
}
