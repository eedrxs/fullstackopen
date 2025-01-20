import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("calls creation handler with correct data on new blog created", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const [titleInput, authorInput, urlInput] = screen.getAllByRole("textbox");
    const submitBtn = screen.getByRole("button");

    await user.type(titleInput, "article");
    await user.type(authorInput, "eedris");
    await user.type(urlInput, "google.com");
    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toMatchObject({
      title: "article",
      author: "eedris",
      url: "google.com",
    });
  });
});
