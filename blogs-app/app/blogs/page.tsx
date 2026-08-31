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
    <div className="max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form method="get">
        <input type="text" name="filter" className="border-1 mr-2" />
        <button className="bg-blue-500 hover:bg-red-500 px-3 py-1 mb-4 rounded text-sm" type="submit">search</button>
      </form>
      <ul className="space-y-2">
        {blogs.map(blog => (
          <li className="border-2 rounded p-3 hover:bg-gray-50" key={blog.id}>
            <Link className="border-2 rounded hover:bg-gray-500 p-1" href={`/blogs/${blog.id}`}>{blog.title}</Link>
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
