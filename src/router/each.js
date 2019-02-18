// 路由
import router from '@/router'
// 状态
import store from '@/store'
// ui
import {
  Message
} from 'element-ui'
// token工具
import {
    getToken
} from '@/utils/auth'
// 打点工具
import {
  showDot
} from '@/utils/dot'

router.beforeEach((to, from, next) => {
    // 获取是否登录了
    const isLogin = store.getters.isLogin

    // 用户是否登录了（在store中的状态）
    if (isLogin) {
        // 判断该页是否能在用户登录时进入
        if (to.meta.loginLevel === -1) {
            // 返回
            Message({
                message: '登录用户不能进入这页了 _(:з」∠)_',
                type: 'error'
            })
            next({
                name: "homepage",
                replace: true
            })
        }
    } else {
        // 判断是否有oid 但是没有store中的登录状态
        const token = getToken()
        if (token) {
            // 获取用户信息
            store.dispatch('GetUserInfo')
            // 判断该页是否能在用户登录时进入
            if (to.meta.loginLevel === -1) {
                // 返回
                Message({
                message: '登录用户不能进入这页了 _(:з」∠)_',
                type: 'error'
                })
                next({
                name: "homepage",
                replace: true
                })
            }
        } else {
            // 真的没有登录
            // 判断该页是否用户必须登录才能进入
            if (to.meta.loginLevel === 1) {
              // 设置首页
              Message({
                message: '用户必须登录才能进入该页面 _(:з」∠)_',
                type: 'error'
              })
              next({
                name: "login",
                replace: true
              })
            }
        }
    }

    // 设置标签
    store.commit("SET_ACTIVE_TAG", to.meta.tagName)
    window.document.title = to.meta.title

    // 展示页面打点
    showDot(to.meta.tagName, from.meta.tagName)
    next()
})


router.afterEach((to, from) => {
    // 回滚到顶部
    window.scrollTo(0, 0);
})