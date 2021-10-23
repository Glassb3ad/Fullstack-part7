/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const testBlog = {
    title: 'Rusinapulla',
    author: 'Mika Waltari',
    url: 'www.pullablogi.fi/rusinapulla',
    likes: 12
  }

  const component = render(
    <Blog blog= {testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Rusinapulla Mika Waltari'
  )
  const element1 = component.getByText(
    'www.pullablogi.fi/rusinapulla'
  )
  expect(element1).not.toBeDefined()

  const element2 = component.getByText(
    '12'
  )
  expect(element2).not.toBeDefined()
})