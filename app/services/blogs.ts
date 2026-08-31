import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"


export const getBlogs = async () => {
  const allBlogs = await db.query.blogs.findMany()
  return allBlogs.sort((a, b) => b.likes - a.likes)
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [newBlog] = await db.insert(blogs).values({ title, author, url, likes, userId: user.id }).returning()
  await db.insert(readingList).values({ blogId: newBlog.id, userId: user.id })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}
export const like = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }

}