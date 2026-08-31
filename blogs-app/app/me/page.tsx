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

  return (
    <div className="max-w-2xl p-6">
      <div data-testid="user-profile">
        <h2>My Profile</h2>
        <p>Name: <span data-testid="user-name">{user?.name}</span></p>
        <p>Username: <span data-testid="user-username">{user?.username}</span></p>
      </div>

      <hr />

      <div data-testid="api-token-section">
        <h2>API Token</h2>
        {user?.token ? (
          <p data-testid="token-display">
            Current Token: <code data-testid="api-token">{user.token}</code>
          </p>
        ) : (
          <p data-testid="no-token-message">No token generated</p>
        )}
        <form action={generateToken}>
          <button
            className="rounded p-1 border-2 mt-2 hover:bg-green-700"
            type="submit"
            data-testid="generate-token-button"
          >
            Generate token
          </button>
        </form>
      </div>

      <div data-testid="reading-list-section">
        <h1 className="mt-4 mb-4"><strong>Reading list:</strong></h1>
        {blogsWithDetails.length === 0 && (
          <p data-testid="empty-reading-list">Your reading list is empty</p>
        )}
        <div data-testid="unread-section">
          <p className="mb-4"><strong>Not read:</strong></p>
          {nonReadBlogs.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs</p>
          ) : (
            <ul>
              {nonReadBlogs.map((item) => (
                <li className="border-1 mb-2 p-4" key={item.id}>
                  {item.blog?.title}
                  <form action={markAsRead}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      className="mr-20 bg-green-700 p-1 text-white rounded"
                      data-testid={`mark-read-${item.id}`}
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="mb-4 mt-4"><strong>Read:</strong></p>
          <ul>
            {readBlogs.map((item) => (
              <li key={item.id}>{item.blog?.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default MyProfile