import { notFound, redirect } from "next/navigation";
import db from "../lib/db";
import getSession from "../lib/session";

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

  return <div>
    <h1>Welcome! {session.username}</h1>
    <p>Your email is {session.email}</p>
    <form action={logOut}>
      <button className="bg-gray-200 rounded-md px-4 py-3 font-bold">Log out</button>
    </form>
  </div>;
}
