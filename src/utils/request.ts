import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000
})

export default service

