import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function TopLogo() {
  return (
    <Link href="/" className="fixed top-0 w-full mx-auto max-w-screen-md py-3 flex items-center justify-center border-b border-neutral-600 bg-neutral-800">
      <FireIcon className="size-12 text-red-500" />
    </Link>
  )
}
