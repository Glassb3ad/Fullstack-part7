import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  //console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const postNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
const updateBlog = async (upBlog, id) => {
  const addres = `${baseUrl}/${id}`
  const response = await axios.put(addres, upBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const addres = `${baseUrl}/${id}`
  const response = await axios.delete(addres, config)
  return response.data
}

export default { getAll, postNewBlog, setToken, updateBlog, deleteBlog }