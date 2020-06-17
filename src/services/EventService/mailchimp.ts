import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.MAILCHIMP_ENDPOINT
})

instance.interceptors.request.use(config => {
  config.auth = { username: 'anystring', password: process.env.MAILCHIMP_API_KEY! }
  return config
})

export const defaultList = process.env.MAILCHIMP_LIST_ID

export default instance
