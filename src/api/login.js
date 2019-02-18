import request from '@/utils/request'

export function loginByUsername(username, password) {
    // 用户登录
    return request({
        url: '/yuehu/user/api/web_login/',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

export function logout() {
    // 用户登出
    return request({
        url: '/yuehu/user/api/web_logout/',
        method: 'get'
    })
}

export function emailRegister(data) {
    // 邮箱注册
    return request({
        url: '/yuehu/user/api/email_register/',
        method: 'post',
        data
    })
}

export function fetchEmailRegister(data) {
    // 获取验证邮箱结果
    return request({
        url: '/yuehu/user/api/email_register/',
        method: 'put',
        data
    })
}

export function emailResetPWD(data) {
    // 邮箱重置密码
    return request({
        url: '/yuehu/user/api/email_forgot_password/',
        method: 'post',
        data
    })
}

export function fetchResetPwdByEmail(data) {
    // 获取邮箱重置密码的结果
    return request({
        url: '/yuehu/user/api/email_forgot_password/',
        method: 'put',
        data
    })
}
