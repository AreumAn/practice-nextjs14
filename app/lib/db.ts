import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const user = await db.like.findUnique({
    where: {
      id: 1,
    },
    include: {
      tweet: true,
      user: true,
    },
  });

  console.log(user);
}

test();
export default db;
