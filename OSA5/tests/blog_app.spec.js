const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, addBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {        
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {        
        username: 'other',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('mluukkai logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('somethingelse')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('mluukkai logged in')).not.toBeVisible()      
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
       await login(page,'mluukkai' , 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('task 5.19')
      await page.getByTestId('author').fill('mluukkai')
      await page.getByTestId('url').fill('www.test.com')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('task 5.19 mluukkai')).toBeVisible()      
    })

    test('a blog can be liked', async ({ page }) => {
      await addBlog(page,'Title1')
      const showButton = page.getByTestId('show/hide-button')
      await showButton.click()

      const likesCount = page.getByTestId('likes-count')
      await expect(likesCount).toHaveText('0')

      const likeButton = page.getByTestId('like-button')
      await likeButton.click()

      await expect(likesCount).toHaveText('1') 
    })

    test('blog can be removed',async ({page}) => {
      page.on('dialog', async dialog => {         
        if (dialog.type() === 'confirm') {
          await dialog.accept()          
        }
      })
      await addBlog(page,'Title1')
      await expect(page.getByText('Title1 mluukkai')).toBeVisible()      
      const showButton = page.getByTestId('show/hide-button')
      await showButton.click()

      const removeButton = page.getByTestId('remove')
      await removeButton.click()
      
      await expect(page.getByText('Title1 mluukkai')).not.toBeVisible()      
    })

    test('remove button is not shown to other users',async({page}) => {
      await addBlog(page,"Title1")

      const logoutButton = page.getByTestId('logout-button')
      await logoutButton.click()

      login(page,'other','salanen')
      const showButton = page.getByTestId('show/hide-button')
      await showButton.click()

      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test('Blogs ordered by likes', async ({page}) =>{
      await addBlog(page,'Title1')
      await page.waitForTimeout(500)
      await addBlog(page,'Title2')

      const secondBlogElement = page.getByText('Title2 mluukkai')
      const parentElement = secondBlogElement.locator('..')
      await parentElement.getByTestId('show/hide-button').click()

      await page.waitForTimeout(500)

      const secondBlog = await parentElement.locator('..')      
      const likeButton = await secondBlog.getByTestId('like-button')
      await expect(likeButton).toBeVisible()
    

      await likeButton.click();
      await page.waitForTimeout(500)
      const likesCount = secondBlog.getByTestId('likes-count')  
      await expect(likesCount).toHaveText('1') 
      
      await page.reload({ timeout: 10000 })
      const firstBlog = page.getByTestId('blog-div').first()
      await expect(firstBlog).toHaveText('Title2 mluukkai')

    })
  })
})
