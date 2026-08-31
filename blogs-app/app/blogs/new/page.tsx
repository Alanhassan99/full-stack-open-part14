"use client"
import { useActionState, useEffect } from "react"
import { createBlog, BlogFormState } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"

const NewBlog = () => {
  const initialState: BlogFormState = {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: false,
  }
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])
  return (
    <div className="mt-10 ml-10">
      <h2 className="mb-10"><em><strong>Create a new blog</strong></em></h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input className="rounded border-2 mt-2 ml-2" type="text" name="title" required defaultValue={state.values?.title} />
            {state.errors?.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
          </label>
        </div>
        <div>
          <label>
            Author
            <input className=" mt-2 ml-2 rounded border-2" type="text" name="author" required defaultValue={state.values?.author} />
            {state.errors?.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
          </label>
        </div>
        <div>
          <label>
            Url
            <input className="mt-2 ml-2 rounded border-2" type="text" name="url" required defaultValue={state.values?.url} />
            {state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
          </label>
        </div>
        <button className="rounded p-1 border-2 mt-2 hover:bg-green-700" type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog