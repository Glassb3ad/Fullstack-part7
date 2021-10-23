/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
import axios from 'axios' 
const baseUrl = '/api/login'
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
export default { login }