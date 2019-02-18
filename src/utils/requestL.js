import axios from 'axios'
import router from '@/router'
import store from '@/store/index'
import {
  Message
} from 'element-ui'
import {
  getCSRFToken
} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 100000
})

service.interceptors.request.use(
  config => {
    // 让每次请求都带上csrf token
    config.headers['X-CSRFTOKEN'] = getCSRFToken()
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response
    if (res.data.code !== 'ok') {
      Message({
        message: res.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    const status_code = error.response.status
    if (status_code === 403) {
      Message({
        message: '你没登录或者没有权限 _(:з」∠)_ 请登录账号',
        type: 'error',
        duration: 5 * 1000
      })
      // 回首页
      router.push({
        name: 'homepage'
      })
    } else if (status_code > 500 || status_code < 600) {
      Message({
        message: '服务器累了 ヽ(。>д<)ｐ 请等待恢服务',
        type: 'error',
        duration: 5 * 1000
      })
      router.push({
        name: 'serverError'
      })
    } else {
      Message({
        message: 'Σ（ﾟдﾟlll） 哇！你发现了未知的BUG！务必告诉我！',
        type: 'error',
        duration: 5 * 1000
      })
      router.push({
        name: 'notFound'
      })
    }
  }
)

export default service
