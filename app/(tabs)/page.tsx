"use client"

import { FireIcon } from "@heroicons/react/24/solid";



export default function Home() {

  return (
    <div className="flex flex-col gap-10 py-14 px-6">
      <div className="flex items-center justify-center">
        <FireIcon className="size-20 text-red-500" />
      </div>
    </div>
  );
}
