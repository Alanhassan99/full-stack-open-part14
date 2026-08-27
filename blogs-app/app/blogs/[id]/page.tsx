import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { increaseLike } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <div><p>{blog.likes}</p><form action={increaseLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like
        </button>
      </form></div>
    </div>
  )
}

export default BlogPage