import request from '@/utils/requestL'

export function OAuthGithub(code) {
    return request({
        url: '/yuehu/user/oauth/github_login/',
        method: 'get',
        params: {
            code: code
        }
    })
}

export function OAuthWeibo(code) {
  return request({
    url: '/yuehu/user/oauth/weibo_login/',
    method: 'get',
    params: {
      code: code
    }
  })
}
