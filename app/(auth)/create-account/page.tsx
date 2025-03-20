"use client"

import { EnvelopeIcon, FireIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { createAccount } from "./action";
import Input from '@/app/components/input';
import Button from '@/app/components/button';


export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null)

  return (
    <div className="flex flex-col gap-10 py-14 px-6">
      <div className="flex items-center justify-center">
        <FireIcon className="size-20 text-red-500" />
      </div>

      <form action={action} className="flex flex-col gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          icon={<EnvelopeIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />}
          errors={state?.fieldErrors?.email}
        />

        <Input
          type="text"
          name="username"
          placeholder="Username"
          required={true}
          icon={<UserIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />}
          errors={state?.fieldErrors?.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          icon={<KeyIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />}
          errors={state?.fieldErrors?.password}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required={true}
          icon={<KeyIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500" />}
          errors={state?.fieldErrors?.confirmPassword}
        />
        

        <Button text="Create Account" />
        
      </form>

    </div>
  );
}
