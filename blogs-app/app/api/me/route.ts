import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const token = authHeader.replace("Bearer ", "")
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true }
  })

  if (!user) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
  }

  return NextResponse.json({ id: user.id, username: user.username, name: user.name, blogs: user.blogs })
}