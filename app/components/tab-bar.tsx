"use client";

import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon,
  PlusCircleIcon as SolidPlusCircleIcon,
  HeartIcon as SolidHeartIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
  PlusCircleIcon as OutlinePlusCircleIcon,
  HeartIcon as OutlineHeartIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>Home</span>
      </Link>
      <Link href="/searcj" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidMagnifyingGlassIcon className="w-7 h-7" />
        ) : (
          <OutlineMagnifyingGlassIcon className="w-7 h-7" />
        )}
        <span>Search</span>
      </Link>
      <Link href="/news" className="flex flex-col items-center gap-px">
        {pathname === "/news" ? (
          <SolidPlusCircleIcon className="w-7 h-7" />
        ) : (
          <OutlinePlusCircleIcon className="w-7 h-7" />
        )}
        <span>New</span>
      </Link>
      <Link href="/like" className="flex flex-col items-center gap-px">
        {pathname === "/like" ? (
          <SolidHeartIcon className="w-7 h-7" />
        ) : (
          <OutlineHeartIcon className="w-7 h-7" />
        )}
        <span>Like</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>Profile</span>
      </Link>
    </div>
  );
}
