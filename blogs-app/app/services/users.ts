import { db } from "../../db"
import { eq } from "drizzle-orm"
import { users } from "../../db/schema"
import { readingList } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true }
  })
}
export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
  })
}