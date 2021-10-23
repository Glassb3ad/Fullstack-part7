/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Like from './Like.js'


test('Two Like clicks equals two function calls', async () => {
  const testBlog = {
    title: 'Rusinapulla',
    author: 'Mika Waltari',
    url: 'www.pullablogi.fi/rusinapulla',
    likes: 12,
    user : {
      username: 'xp234',
      name: 'Mika Waltari'
    },
    id : '1234567'
  }
  const mockHandler = jest.fn()
  const component = render(
    <Like blog= {testBlog} addLike = {mockHandler}/>
  )
  component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})