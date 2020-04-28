import axios from 'axios'
import Qs from 'qs'

// So we have deep object param serializing
axios.interceptors.request.use(config => {
  config.paramsSerializer = params => Qs.stringify(params)
  return config
})

export default axios
