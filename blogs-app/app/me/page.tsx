import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getUserByUsername } from "../services/users"
import { generateToken } from "../actions/users"
import { getReadingList } from "../services/users"
import { getBlogs } from "../services/blogs"
import { markAsRead } from "../actions/readinglist"

const MyProfile = async () => {
  const session = await auth()
  if (!session) {
    return redirect("/login")
  }
  const user = await getUserByUsername(session.user?.email as string)
  const list = await getReadingList(user!.id)
  const allBlogs = await getBlogs()
  const blogsWithDetails = list.map((entry) => ({
    ...entry,
    blog: allBlogs.find((b) => b.id === entry.blogId),
  }))
  const readBlogs = blogsWithDetails.filter((entry) => entry.read === true)
  const nonReadBlogs = blogsWithDetails.filter((entry) => entry.read === false)
  return <div className="max-w-2xl p-6">
    <h2>My Profile </h2>
    <p>Name: {user?.name}</p>
    <p>Username: {user?.username}</p>
    <hr></hr>
    <h2>API Token </h2>
    <p>Current Token: {user?.token ? user.token : "No token generated"}</p>
    <form action={generateToken}>
      <button className="rounded p-1 border-2 mt-2 hover:bg-green-700" type="submit">Generate token</button>
    </form>
    <h1 className="mt-4 mb-4"><strong>Readinglist: </strong></h1>
    <div>
      <p className="mb-4"><strong>Not read:</strong></p>
      <ul>
        {nonReadBlogs.map((item) => (
          <li className="border-1 mb-2 p-4" key={item.id}>
            {item.blog?.title} <form action={markAsRead}>
              <input type="hidden" name="id" value={item.id} />
              <button className="mr-20 bg-green-700 p-1 text-white rounded">Mark as read</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p className="mb-4 mt-4"><strong>Read:</strong></p>
      <ul>
        {readBlogs.map((item) => (
          <li key={item.id}>
            {item.blog?.title}
          </li>
        ))}
      </ul>
    </div>

  </div>
}
export default MyProfile