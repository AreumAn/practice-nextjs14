"use client"

import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function Home() {

  return (
    <div className="flex flex-col gap-10 py-14 px-6">
      <div className="flex items-center justify-center">
        <FireIcon className="size-20 text-red-500" />
      </div>

      <button className="bg-gray-200 rounded-md px-4 py-3 font-bold">
        <Link href="/create-account">
          Create Account
        </Link>
      </button>

      <button className="bg-gray-200 rounded-md px-4 py-3 font-bold">
        <Link href="/log-in">
          Log In
        </Link>
      </button>

    </div>
  );
}
