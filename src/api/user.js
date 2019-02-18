import request from '@/utils/request'

export function fetchUserInfo() {
  // 用户信息
  return request({
    url: '/yuehu/user/api/info/',
    method: 'get'
  })
}

export function fetchSelfBaseInfo() {
  // 获取自己的基本信息
  return request({
    url: '/yuehu/user/api/user/info/base/',
    method: 'get'
  })
}

export function changeSelfPWD(data) {
  // 修改自己的密码

  return request({
    url: '/yuehu/user/api/user/info/base/',
    method: 'post',
    data
  })
}

export function changeSelfNickName(data) {
  // 修改自己的昵称

  return request({
    url: '/yuehu/user/api/user/info/base/',
    method: 'put',
    data
  })
}

export function fetchAllDefaultAvata() {
  // 获取所有默认头像
  return request({
    url: '/yuehu/user/api/user/default/avatar/',
    method: 'get'
  })
}

export function setSelfDefaultAvata(data) {
  // 设置默认头像
  console.log("function", data)
  return request({
    url: '/yuehu/user/api/user/default/avatar/',
    method: 'put',
    data
  })
}

export function BindSelfEmail(data) {
  // 绑定自己的邮箱
  return request({
    url: '/yuehu/user/api/user/bind/email/info/',
    method: 'post',
    data
  })
}

export function checkSelfBindEmail(data) {
  // 验证自己绑定的邮箱
  return request({
    url: '/yuehu/user/api/user/bind/email/check/',
    method: 'put',
    data
  })
}
