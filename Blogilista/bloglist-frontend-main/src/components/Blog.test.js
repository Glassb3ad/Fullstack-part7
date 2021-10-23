/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Only author and title are visible', () => {
  const testBlog = {
    title: 'Rusinapulla',
    author: 'Mika Waltari',
    url: 'www.pullablogi.fi/rusinapulla',
    likes: 12,
    user : {
      username: 'xp234',
      name: 'Mika Waltari'
    }
  }
  const user = {
    username: 'xp234',
    name: 'Mika Waltari'
  }

  const component = render(
    <Blog blog= {testBlog} user = {user} />
  )
  component.debug()

  expect(component.container.querySelector('.testDiv')).toHaveStyle('display: none')

  expect(component.container).toHaveTextContent(
    'Rusinapulla Mika Waltari'
  )
})

test('Button click reveals everything', () => {
  const testBlog = {
    title: 'Rusinapulla',
    author: 'Mika Waltari',
    url: 'www.pullablogi.fi/rusinapulla',
    likes: 12,
    user : {
      username: 'xp234',
      name: 'Mika Waltari'
    }
  }
  const user = {
    username: 'xp234',
    name: 'Mika Waltari'
  }

  const component = render(
    <Blog blog= {testBlog} user = {user} />
  )
  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)
  component.debug()

  expect(component.container.querySelector('.testDiv')).not.toHaveStyle('display: none')
})
