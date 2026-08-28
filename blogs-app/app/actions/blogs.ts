"use server"

import { redirect } from "next/navigation"
import { addBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { like } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = parseInt(formData.get("likes") as string)
  await addBlog(title, author, url, likes)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const increaseLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await like(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}