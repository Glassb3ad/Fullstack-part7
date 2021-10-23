/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import app from '../app.js'

test('Two Like clicks equals two function calls', async () => {
  const TestTool = ({ mockHandler }) => {
    const [title, setTitle] = useState('x')
    const [author, setAuthor] = useState('x')
    const [url, setUrl] = useState('x')
    const user = {
      username: 'xp234',
      name: 'Mika Waltari'
    }
    const handler = () => {
      return mockHandler({
        title: title,
        author: author,
        url: url
      })
    }
    return(
      <app.CreateNewBlog  handlePost = {handler} user = {user} title = {title} url = {url} author = {author} setTitle = {setTitle} setAuthor = {setAuthor} setUrl = {setUrl}/>
    )
  }
  const mockHandler = jest.fn()
  const component = render(
    <TestTool mockHandler = {mockHandler}/>
  )

  const form = component.container.querySelector('#form')

  fireEvent.change(component.container.querySelector('#author'),{
    target: { value: 'Eino Leino' }
  })

  fireEvent.change(component.container.querySelector('#title'), {
    target: { value: 'Elämän kevät' }
  })
  fireEvent.change(component.container.querySelector('#url'), {
    target: { value: 'www.joku.com/blogi' }
  })

  //component.debug()
  fireEvent.submit(form)
  //fireEvent.click(component.container.querySelector('#button'))
  component.debug()
  //console.log(mockHandler.mock.calls)
  //console.log(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].author).toBe('Eino Leino')
  expect(mockHandler.mock.calls[0][0].title).toBe('Elämän kevät')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.joku.com/blogi')
})