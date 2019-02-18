import axios from 'axios'
import router from '@/router'
import {
  Message,
  MessageBox
} from 'element-ui'
import {
    getCSRFToken
} from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
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
            MessageBox.confirm('需要登录后才能进行该操作，是否去登录？', '登录提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 去登录
              router.push({
                name: 'login'
              })
            }).catch(() => {
              Message({
                message: '取消登录',
                type: 'error',
                duration: 5 * 1000
              })
            });
            return Promise.reject('error')
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

