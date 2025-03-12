import { EnvelopeIcon, FireIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-14 px-6">
      <div className="flex items-center justify-center">
        <FireIcon className="size-20" />
      </div>

      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 relative">
          <div className="relative">
            <input 
              type="email" 
              className="w-full rounded-full px-12 border-2 border-gray-300 p-2 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" 
              placeholder="Email"
            />
            <EnvelopeIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />
          </div>
          <span className="text-red-500">error message</span>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="relative">
            <input 
              type="text" 
              className="w-full rounded-full px-12 border-2 border-gray-300 p-2 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" 
              placeholder="Name"
            />
            <UserIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />
          </div>
          <span className="text-red-500">error message</span>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="relative">
            <input 
              type="password" 
              className="w-full rounded-full px-12 border-2 border-gray-300 p-2 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" 
              placeholder="Password"
            />
            <KeyIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />
          </div>
          <span className="text-red-500">error message</span>
        </div>

        <button className="bg-gray-200 rounded-full px-4 py-3 font-bold">Log in</button>
      </form>


      
    </div>
  );
}
