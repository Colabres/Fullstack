import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> testing onSubmit', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('save')

  await user.type(title, 'blogTitle')
  await user.type(author, 'blogAuthor')
  await user.type(url, 'blogUrl')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('blogTitle')
  expect(addBlog.mock.calls[0][0].author).toBe('blogAuthor')
  expect(addBlog.mock.calls[0][0].url).toBe('blogUrl')
})