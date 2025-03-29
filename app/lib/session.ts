import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number,
  username?: string
}

export default async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: "practice-nextjs",
    password: process.env.COOKIE_PASSWORD!
  })
}
