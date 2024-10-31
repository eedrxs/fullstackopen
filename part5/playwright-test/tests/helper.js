const loginWith = async (page, username, password) => {
  await page.getByLabel("username:").fill(username)
  await page.getByLabel("password:").fill(password)
  await page.getByRole("button", { name: "login" }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole("button", { name: "new note" }).click()
  await page.getByLabel("title:").fill(content.title)
  await page.getByLabel("author:").fill(content.author)
  await page.getByLabel("url:").fill(content.url)
  await page.getByRole("button", { name: "create" }).click()
}

const createUser = async (request, data) => {
  await request.post("http://localhost:3001/api/users", { data })
}

const delay = (milisecs) =>
  new Promise((resolve) => setTimeout(() => resolve(), milisecs))

export { loginWith, createBlog, createUser, delay }
