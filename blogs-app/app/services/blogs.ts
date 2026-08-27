const blogs = [
  { id: 1, title: "theBlog", author: "Blogger2", url: "google.com", likes: 9 },
  { id: 2, title: "theBlogz", author: "Blogger1", url: "bing.com", likes: 0 },
  { id: 3, title: "theBlogs", author: "Blogger3", url: "yahoo.com", likes: 19 },
]

let nextId = 4

export const getBlogs = () => {
  const shallowCopy = [...blogs]
  return shallowCopy.sort((a, b) => b.likes - a.likes)
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}
export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}
export const like = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes++
  }
}