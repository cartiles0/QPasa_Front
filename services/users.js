import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

const createAccount = async function () {
  const response = await API.post('/auth/signup')
  return response
}

export default {
  createAccount,
}
