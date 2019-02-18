import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout'
import LoginPage from '@/components/loginPage'
import ErrorPage from '@/components/errorPage'
import BlankPage from '@/components/blankPage'

Vue.use(Router)

// 声明路由

// meta 参数
//// title: 页面浏览器标签显示名称(必填)
//// tagName: 首页导航栏标签(配置填写)
//// loginLevel: 登录等级 等级不符不能访问该路由
////// -1: 必须不登录才能访问
////// 0: 无要求 均可访问
////// 1: 必须登录才能访问

const VueRoutersTable = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: 'layout',
      loginLevel: 0
    },
    children: [
      {
        path: '',
        name: 'homepage',
        component: (resolve) => require(['@/views/index'], resolve),
        meta: {
          tagName: "homepage",
          title: '主页',
          loginLevel: 0
        }
      },
      {
        path: 'archive',
        name: 'archive',
        component: (resolve) => require(['@/views/timeLine'], resolve),
        meta: {
          tagName: "archive",
          title: '存档',
          loginLevel: 0
        }
      },
      {
        path: 'article',
        component: (resolve) => require(['@/views/article'], resolve),
        name: 'article',
        meta: {
          tagName: "article",
          title: '文章详情',
          loginLevel: 0
        }
      },
      {
        path: 'imgwall',
        component: (resolve) => require(['@/views/imgWall'], resolve),
        name: 'imgWall',
        meta: {
          tagName: 'imgWall',
          title: '图片墙',
          loginLevel: 0
        }
      },
      {
        path: 'self',
        component: (resolve) => require(['@/views/self'], resolve),
        name: 'selfSpace',
        meta: {
          tagName: 'selfSpace',
          title: '个人中心',
          loginLevel: 1
        },
        children: [
          {
            path: 'info/base',
            component: (resolve) => require(['@/views/self/item/info'], resolve),
            name: 'selfSpanBaseInfo',
            meta: {
              tagName: 'selfSpanBaseInfo',
              title: '基础信息|个人资料',
              loginLevel: 1
            }
          },
          {
            path: 'change/pwd',
            component: (resolve) => require(['@/views/self/item/setChangePWD'], resolve),
            name: 'selfSpanChangePWD',
            meta: {
              tagName: 'selfSpanChangePWD',
              title: '修改密码|个人设置',
              loginLevel: 1
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    redirect: '/login/email',
    component: LoginPage,
    name: 'LoginPage',
    meta: {
      tagName: 'login',
      loginLevel: -1
    },
    children: [
      {
        path: 'email',
        component: (resolve) => require(['@/views/login/page/login'], resolve),
        name: "login",
        meta: {
          tagName: 'Login',
          title: '登录',
          loginLevel: -1
        }
      },
      {
        path: 'register/email',
        component: (resolve) => require(['@/views/login/page/registerEmail'], resolve),
        name: "registerEmail",
        meta: {
          tagName: 'registerEmail',
          title: '注册',
          loginLevel: -1
        }
      },
      {
        path: 'forget/password',
        component: (resolve) => require(['@/views/login/page/forgetPWD'], resolve),
        name: "forgetPWD",
        meta: {
          tagName: 'forgetPWD',
          title: '忘记密码',
          loginLevel: -1
        }
      }
    ]
  },
  {
    path: '/check',
    component: BlankPage,
    meta: {
      tagName: "check",
      loginLevel: -1
    },
    children: [
      {
        path: 'register/email',
        component: (resolve) => require(['@/views/login/check/checkRegisterEmail'], resolve),
        name: "checkRegisterEmail",
        meta: {
          tagName: 'checkRegisterEmail',
          title: '验证邮箱',
          loginLevel: -1
        }
      },
      {
        path: 'reset/pwd',
        component: (resolve) => require(['@/views/login/check/checkResetPWD'], resolve),
        name: "CheckResetForgetPWD",
        meta: {
          tagName: 'CheckResetForgetPWD',
          title: '校验重置密码',
          loginLevel: -1
        }
      },
      {
        path: 'bind/email',
        component: (resolve) => require(['@/views/login/check/checkSelfBindEmail'], resolve),
        meta: {
          tagName: 'CheckSelfBindEmail',
          title: '校验个人绑定邮箱',
          loginLevel: 0
        }
      }
    ]
  },
  {
    path: '/oauth',
    component: BlankPage,
    meta: {
      tagName: "oauth",
      loginLevel: -1
    },
    children: [
      {
        path: 'weibo',
        component: (resolve) => require(['@/views/oauth/oauthWeibo'], resolve),
        name: "WeiBoLogin",
        meta: {
          tagName: 'WeiBoLogin',
          title: '微博登录',
          loginLevel: -1
        }
      }, {
        path: 'github',
        component: (resolve) => require(['@/views/oauth/oauthGithub'], resolve),
        name: "GithubLogin",
        meta: {
          tagName: 'GithubLogin',
          title: 'github登录',
          loginLevel: -1
        }
      }
    ]
  },
  {
    path: '/error',
    component: ErrorPage,
    redirect: '/error/404',
    meta: {
      tagName: "errorPage",
      loginLevel: 0
    },
    children: [
      {
        path: '404',
        component: (resolve) => require(['@/views/error/NotFound'], resolve),
        name: "notFound",
        meta: {
          tagName: "notFound",
          title: '404',
          loginLevel: 0
        },
      },
      {
        path: '500',
        component: (resolve) => require(['@/views/error/ServerError'], resolve),
        name: "serverError",
        meta: {
          tagName: "serverError",
          title: '500',
          loginLevel: 0
        }
      }
    ]
  },
  {
    path: '/*',
    redirect: {
      name: 'notFound'
    },
    meta: {
      tagName: "errorPath",
      loginLevel: 0
    }
  }
]

export default new Router({
  mode: 'history',
  routes: VueRoutersTable
})


