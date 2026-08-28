import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = await getBlogs()
  const blogs = filter
    ? allBlogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    : allBlogs
  return (
    <div>
      <h2>Blogs</h2>
      <form method="get">
        <input type="text" name="filter" />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map(blog => (
          <li style={{ marginBottom: 10 }} key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <div><strong>Title:</strong> {blog.title}</div>
            <div><strong>author:</strong> {blog.author}</div>
            <div><strong>url:</strong> {blog.url}</div>
            <div><strong>likes:</strong> {blog.likes}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
