import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let mockHandler
let blog

beforeEach(() => {
    blog = {
        title: 'blogTitle',
        author: 'blogAuthor',
        url: 'blogUrl',
        likes: 5,
        user: {
            username: 'pallen'
        }
      }
      mockHandler = vi.fn()

      render(
        <Blog blog={blog} testLike={mockHandler} />
      )
    
      //render(<Blog blog={blog} />)
  })

test('N1 Only Title&Author visible',async () => {

    //screen.debug()
    const element1 = screen.getByText('blogTitle blogAuthor')
    expect(element1).toBeInTheDocument()
    
    const element2 = screen.queryByText('blogUrl')
    expect(element2).not.toBeVisible() 
  
    })




test('N2 All visible after button click',async () => {

  //screen.debug()
  const element1 = screen.getByText('blogTitle blogAuthor')
  expect(element1).toBeInTheDocument()
  
  const element2 = screen.queryByText('blogUrl')
  expect(element2).not.toBeVisible() 

  
  const toggleButton = screen.getByText('Show')
  screen.debug(toggleButton)
  const user = userEvent.setup()
  await user.click(toggleButton)
  //screen.debug()


  const element3 = screen.queryByText('blogUrl')
  expect(element3).toBeVisible()
  const element4 = screen.queryByText('5')
  expect(element4).toBeVisible()
  const element5 = screen.queryByText('pallen')
  expect(element5).toBeVisible()
})

test('N3 All visible after button click',async () => {

    //screen.debug()
    const element1 = screen.getByText('blogTitle blogAuthor')
    expect(element1).toBeInTheDocument()
    
    const element2 = screen.queryByText('blogUrl')
    expect(element2).not.toBeVisible() 
  
    
    const toggleButton = screen.getByText('Show')
    screen.debug(toggleButton)
    const user = userEvent.setup()
    await user.click(toggleButton)
    //screen.debug()
  
  
    const button = screen.getByText('Like')
    screen.debug(button)
    await user.click(button)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })