import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  let container
  const blog = {
    title: "article",
    author: "Idris",
    user: { username: "eedris" },
    url: "google.com",
    likes: 2,
  }

  const likeHandler = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} likeBlog={likeHandler} />).container
  })

  test("displays only title and author by default", () => {
    screen.getByText("article Idris")
    const likesEl = container.querySelector(".likes")
    const usernameEl = container.querySelector(".username")
    expect(likesEl).toBeNull()
    expect(usernameEl).toBeNull()
  })

  test("displays url and likes after view button click", async () => {
    const user = userEvent.setup()
    const toggleBtn = screen.getByRole("button")

    await user.click(toggleBtn)
    screen.getByRole("link")
    const likesEl = container.querySelector(".likes")
    expect(likesEl).toBeDefined()
  })

  test("like handler is called twice on two clicks", async () => {
    const user = userEvent.setup()
    const toggleBtn = screen.getByRole("button")
    await user.click(toggleBtn)

    const [_, likeBtn] = screen.getAllByRole("button")
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
