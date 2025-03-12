import { EnvelopeIcon, FireIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import FormInput from "./components/form-input";
import FormBtn from "./components/form-btn";
export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-14 px-6">
      <div className="flex items-center justify-center">
        <FireIcon className="size-20" />
      </div>

      <form className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="Email"
          required={true}
          icon={<EnvelopeIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />}
          errors={[]}
        />

        <FormInput
          type="text"
          placeholder="Name"
          required={true}
          icon={<UserIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />}
          errors={[]}
        />

        <FormInput
          type="password"
          placeholder="Password"
          required={true}
          icon={<KeyIcon className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-gray-500" />}
          errors={["error!!"]}
        />

        <FormBtn loading={false} text="Log in" />
      </form>

    </div>
  );
}
