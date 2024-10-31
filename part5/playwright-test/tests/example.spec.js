const { test, expect, beforeEach, describe } = require("@playwright/test")
const { loginWith, createBlog, createUser, logout, delay } = require("./helper")

describe("Blog app", () => {
  const loginText = "John Doe is logged in"

  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset")
    await createUser(request, {
      name: "John Doe",
      username: "johndoe",
      password: "secure",
    })
    await createUser(request, {
      name: "Jane Doe",
      username: "janedoe",
      password: "secure",
    })
    await page.goto("http://localhost:5173")
  })

  test("Login form is shown", async ({ page }) => {
    const loginForm = page
      .getByRole("form")
      .filter({ has: page.getByRole("heading", { name: "login" }) })

    await expect(loginForm).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "johndoe", "secure")
      await page.getByText(loginText).waitFor()
      expect(page.getByText(loginText)).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "johndoe", "not_secure")
      const errMsg = page.getByText("invalid username or pas")
      await errMsg.waitFor()
      expect(errMsg).toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.evaluate(() => localStorage.clear())
      await loginWith(page, "johndoe", "secure")
      await page.getByText(loginText).waitFor()
      await createBlog(page, {
        title: "article1",
        author: "writer1",
        url: "google.com",
      })
    })

    test("a new blog can be created", async ({ page }) => {
      const blogItem = page.getByText("article1 writer1")
      await blogItem.waitFor()
      expect(blogItem).toBeVisible()
    })

    test("a blog can be liked", async ({ page }) => {
      const blogItem = page.getByText("article1 writer1").locator("..")
      await blogItem.waitFor()
      await blogItem.getByRole("button", { name: "view" }).click()
      const likeBtn = blogItem.getByRole("button", { name: "like" })
      const likesLocator = blogItem.getByText("likes")
      const likesText = await likesLocator.innerText()
      const initialLikes = parseInt(likesText.match(/\d+/)[0])
      await likeBtn.waitFor()
      await likeBtn.click()

      const updatedLikesLocator = blogItem.getByText(
        `likes ${initialLikes + 1}`
      )
      await updatedLikesLocator.waitFor()

      const updatedLikesText = await updatedLikesLocator.innerText()
      const updatedLikes = parseInt(updatedLikesText.match(/\d+/)[0])
      expect(updatedLikes).toEqual(initialLikes + 1)
    })

    test("user who added blog can delete it", async ({ page }) => {
      const blogItem = page.locator(".blog").first()
      await blogItem.waitFor()

      page.on("dialog", async (dialog) => {
        if (dialog.type() === "confirm") {
          await dialog.accept()
        }
      })

      await blogItem.getByRole("button", { name: "view" }).click()
      await blogItem.getByRole("button", { name: "delete" }).click()

      await page.waitForResponse(
        (response) =>
          response.url().includes("/api/blogs") && response.status() === 204
      )

      await page.waitForResponse(
        (response) =>
          response.url().includes("/api/blogs") && response.status() === 200
      )

      expect(blogItem).not.toBeVisible()
    })

    test("only user who added blog can see delete button", async ({ page }) => {
      await page.locator(".blog").first().waitFor()
      await page.getByRole("button", { name: "logout" }).click()
      await loginWith(page, "janedoe", "secure")
      await page.getByText("Jane Doe is logged in").waitFor()

      const blogItem = page.locator(".blog").first()
      await blogItem.waitFor()

      await blogItem.getByRole("button", { name: "view" }).click()
      const deleteBtn = blogItem.getByRole("button", { name: "delete" })

      expect(deleteBtn).not.toBeVisible()
    })

    test("blogs are arranged in the order of most likes", async ({ page }) => {
      await page.getByRole("button", { name: "cancel" }).click()
      await createBlog(page, {
        title: "article2",
        author: "writer2",
        url: "google.com",
      })

      const firstBlog = page.locator(".blog").nth(0)
      const secondBlog = page.locator(".blog").nth(1)
      await firstBlog.waitFor()
      await secondBlog.waitFor()

      const initialTopmostBlogTitle = await firstBlog
        .locator("div")
        .first()
        .innerText()

      await secondBlog.getByRole("button", { name: "view" }).click()
      await secondBlog.getByRole("button", { name: "like" }).click()

      await page.waitForResponse(
        (response) =>
          response.url().includes("/api/blogs") && response.status() === 202
      )
      await delay(2000)

      const updatedTopmostBlogTitle = await firstBlog
        .locator("div")
        .first()
        .innerText()

      expect(updatedTopmostBlogTitle).not.toEqual(initialTopmostBlogTitle)
    })
  })
})
