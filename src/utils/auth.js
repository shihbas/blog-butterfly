import Cookies from 'js-cookie'

const TokenCSRF = 'csrftoken'
const OidName = 'YH_OID'

// csrf token
export function getCSRFToken() {
    return Cookies.get(TokenCSRF)
}

// 获取登录凭证 凭证为后端服务设置的不用前端设置
export function getToken() {
    return Cookies.get(OidName)
}

// 移除登录凭证
export function removeToken() {
    return Cookies.remove(OidName)
}
