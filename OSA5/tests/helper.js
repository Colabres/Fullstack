const { test, expect, beforeEach, describe } = require('@playwright/test')

const login = async (page,username,password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const addBlog = async (page,title) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill('mluukkai')
    await page.getByTestId('url').fill('www.test.com')
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByRole('button', { name: 'cancel' }).click()
  }

  export { login , addBlog}