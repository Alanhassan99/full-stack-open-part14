"use server"
import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { like } from "../services/blogs"
import { auth } from "@/auth"
export type BlogFormState = {
  errors: { title?: string; author?: string; url?: string }
  values: { title: string; author: string; url: string }
  success: boolean
}
export const createBlog = async (prevState: BlogFormState, formData: FormData) => {
  const session = await auth()
  if (!session) {
    return redirect("/login")
  }
  const errors: BlogFormState["errors"] = {}
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string


  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  const likes = parseInt(formData.get("likes") as string) || 0
  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  return { errors: {}, values: { title: "", author: "", url: "" }, success: true }
}

export const increaseLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await like(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}