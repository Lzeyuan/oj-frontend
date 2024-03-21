import axios from 'axios'

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  return config
})

axios.interceptors.response.use((config) => {
  //这里是响应成功执行的代码
  const jwt = config?.data?.data?.token ?? ''
  if (jwt !== '') {
    localStorage.setItem('token', jwt)
  }
  return config
})
