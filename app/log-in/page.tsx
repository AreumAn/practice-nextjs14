"use client"

import { EnvelopeIcon, FireIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { formAction } from "../action/form-action";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Input from '../components/input';
import Button from '../components/button';


export default function LogIn() {
  const [state, action] = useFormState(formAction, null)

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
        

        <Button text="Log in" />

        {state?.success === true && (
          <div className="flex items-center gap-2 bg-green-600 rounded-xl px-4 py-6 mt-4 font-bold ">
              <CheckBadgeIcon className="size-6" />
              <span>Welcome Back!</span>
          </div>
        )}
        
      </form>

    </div>
  );
}
