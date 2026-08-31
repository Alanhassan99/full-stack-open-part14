import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { increaseLike } from "@/app/actions/blogs"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { addToReadingList } from "@/app/actions/readinglist"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const session = await auth()
  const user = session ? await db.query.users.findFirst({
    where: eq(users.username, session.user?.email as string),
  }) : null

  if (!blog) {
    notFound()
  }

  return (
    <div className="mt-10 ml-10">
      <h2><em><strong>TITLE:</strong></em> {blog.title}</h2>
      <p><em><strong>AUTHOR:</strong></em> {blog.author}</p>
      <p><em><strong>URL:</strong></em> {blog.url}</p>
      <div><p><em><strong>LIKES:</strong></em> {blog.likes}</p><form action={increaseLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button className="rounded p-1 border-2 hover:bg-green-700" type="submit">Like
        </button>
      </form>
        {user && user.id !== blog.userId && (
          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button className="rounded p-1 border-2 hover:bg-green-700">add to reading list</button>
          </form>
        )}</div>
    </div >
  )
}

export default BlogPage