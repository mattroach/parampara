import axios from 'axios'
import Qs from 'qs'
import { AppDispatch } from 'store/store'
import { setAuthFailure } from 'store/slices/admin'

const instance = axios.create()
let appDispatch: AppDispatch

// So we have deep object param serializing
instance.interceptors.request.use(config => {
  config.paramsSerializer = params => Qs.stringify(params)
  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status === 401) {
      console.info('API failed auth')
      appDispatch(setAuthFailure())
    }

    return Promise.reject(error)
  }
)

export const setAppDispatch = (d: AppDispatch) => {
  appDispatch = d
}

export default instance
