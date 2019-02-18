import router from '@/router'

import {
    loginByUsername,
    logout
}
from '@/api/login'

import {
    fetchUserInfo
}
from '@/api/user'

import {
    removeToken
} from '@/utils/auth'

const user = {
    state: {
        displayName: '',
        avatar: '',
        openId: '',
        isLogin: false
    },
    mutations: {
        SET_IS_LOGIN: (state, isLogin) => {
            state.isLogin = isLogin
        },
        SET_DISPLAY_NAME: (state, displayName) => {
            state.displayName = displayName
        },
        SET_AVATER: (state, avatar) => {
            state.avatar = avatar
        },
        SET_OPEN_ID: (state, openId) => {
            state.openId = openId
        }
    },
    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                    commit("SET_DISPLAY_NAME", response.data.display_name)
                    commit("SET_AVATER", response.data.avatar)
                    commit("SET_OPEN_ID", response.data.open_id)
                    commit("SET_IS_LOGIN", true)
                })
            })
        },
        // 获取用户信息
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                fetchUserInfo().then(response => {
                    commit("SET_DISPLAY_NAME", response.data.display_name)
                    commit("SET_AVATER", response.data.avatar)
                    commit("SET_OPEN_ID", response.data.open_id)
                    commit("SET_IS_LOGIN", true)
                })
            })
        },
        // 登出
        Logout({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(response => {
                    removeToken()
                    commit("SET_IS_LOGIN", false)
                    commit("SET_DISPLAY_NAME", '')
                    commit("SET_AVATER", '')
                    commit("SET_OPEN_ID", '')
                    router.push({
                        name: 'login'
                    })
                })
            })
        },
        // 前端登出
        ClientLogout({commit}) {
            // return new Promise((resolve, reject) => {
            removeToken()
            commit("SET_IS_LOGIN", false)
            commit("SET_DISPLAY_NAME", '')
            commit("SET_AVATER", '')
            commit("SET_OPEN_ID", '')
            // })
        }
    }
}

export default user
