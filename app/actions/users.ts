"use server"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
export type UserFormState = {
  errors: { username?: string; password?: string; passwordConfirm?: string }
  values: { username: string; password: string; passwordConfirm: string }
}

export const registerUser = async (prevState: UserFormState, formData: FormData) => {
  const errors: UserFormState["errors"] = {}
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string
  const user = await db.query.users.findFirst({
    where: eq(users.username, username as string),
  })
  if (user) {
    errors.username = "Username already taken"
  }
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords must be the same"
  }
  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, password, passwordConfirm } }
  }
  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateToken = async () => {
  const session = await auth()
  if (!session) {
    return redirect("/login")
  }
  const username = session.user?.email as string
  const user = await db.query.users.findFirst({
    where: eq(users.username, username as string),
  })
  const theToken = crypto.randomUUID()
  await db.update(users).set({ token: theToken }).where(eq(users.id, user!.id))
  revalidatePath("/me")
}