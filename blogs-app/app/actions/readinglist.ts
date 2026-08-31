"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { readingList } from "../../db/schema"


export const addToReadingList = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    return redirect("/login")
  }
  const username = session.user?.email as string
  const user = await db.query.users.findFirst({
    where: eq(users.username, username as string),
  })
  const blogId = Number(formData.get("blogId"))
  await db.insert(readingList).values({ userId: user!.id, blogId })

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}


export const markAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await db.update(readingList).set({ read: true }).where(eq(readingList.id, id))
  revalidatePath("/me")
}