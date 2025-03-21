import { notFound, redirect } from "next/navigation";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";


const getUser = async() => {
  const session = await getSession()
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id
      }
    })

    if (user) {
      return user
    }
  }

  notFound();

}


export default async function Profile() {
  const session = await getUser()
  const logOut = async () => {
    "use server"
    const session = await getSession()
    await session.destroy()
    redirect("/")
  }

  return <div className="flex flex-col gap-4 text-white">
    <h1>Welcome! {session.username}</h1>
    <p>Your email is {session.email}</p>
    <form action={logOut}>
      <button className="bg-neutral-500 rounded-md px-4 py-3 font-bold text-black">Log out</button>
    </form>
  </div>;
}
