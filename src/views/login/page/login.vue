<template>
    <div class="am-g">
        <div class="am-u-lg-3 am-u-md-6 am-u-sm-8 am-u-sm-centered log-content">
            <h1 class="log-title am-animation-slide-top">登录</h1>
            <br>
            <form class="am-form">
            <div class="am-input-group am-radius am-animation-slide-left">
                <el-tooltip :disabled="notTipEmail" content="请输入正确的邮箱格式" placement="top" effect="light">
                    <input type="text" class="am-radius" placeholder="邮箱"
                        @blur.prevent="checkEmail"
                        v-model="postFrom.username"
                        required/>
                </el-tooltip>
                <span class="am-input-group-label log-icon am-radius"><i class="am-icon-user am-icon-sm am-icon-fw"></i></span>
            </div>
            <br>
            <div class="am-input-group am-animation-slide-left log-animation-delay">   
                <el-tooltip :disabled="notTipPWD" content="请输入长度在10-16位的密码" placement="bottom" effect="light">    
                    <input type="password" class="am-form-field am-radius log-input" placeholder="密码"
                        @blur.prevent="checkPWD"
                        v-model="postFrom.password"
                        required>
                </el-tooltip>
                <span class="am-input-group-label log-icon am-radius"><i class="am-icon-lock am-icon-sm am-icon-fw"></i></span>
            </div>
            <br>
            <button 
                class="am-btn am-btn-primary am-btn-block am-btn-lg am-radius am-animation-slide-bottom log-animation-delay" 
                @click.self.prevent="Login"
                :disabled="IsClickedBTN"
            >
            登 录
            </button>
            <p class="am-animation-slide-bottom log-animation-delay">
                <router-link :to="{name: 'forgetPWD', }">忘记密码?</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="{name: 'registerEmail', }">注册?</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="{name: 'homepage'}">回首页?</router-link>
            </p>
            <div class="am-btn-group  am-animation-slide-bottom log-animation-delay-b">
                <h2>使用第三方登录</h2>
                <a href="https://api.weibo.com/oauth2/authorize?response_type=code&client_id=4289819484&redirect_uri=https%3A%2F%2Fwww.python-dog.com%2Foauth%2Fweibo&scope=all+follow_app_official_microblog&state=python_dog" class="am-btn am-btn-danger am-btn-sm"><i class="am-icon-weibo am-icon-sm">微博</i></a>
                <a href="https://github.com/login/oauth/authorize?response_type=code&client_id=4356fcd402e5b0f205d9&redirect_uri=https%3A%2F%2Fwww.python-dog.com%2Foauth%2Fgithub&scope=user&state=python_dog" class="am-btn am-btn-secondary am-btn-sm"><i class="am-icon-github am-icon-sm">github</i></a>
            </div>
            </form>
        </div>
    </div>
</template>
<script>

import { ValidateEmail } from '@/utils/common'

export default {
    name: 'LoginPage',
    data() {
        return {
            notTipEmail: false,
            notTipPWD: false,
            postFrom: {
                username: '',
                password: ''
            },
            isClicked: false
        }
    },
    methods: {
        checkEmail() {
            this.notTipEmail = ValidateEmail(this.postFrom.username)
        },
        checkPWD() {
            this.notTipPWD = this.checkPWDLen()
        },
        checkPWDLen() {
            return this.postFrom.password.length > 9 && this.postFrom.password.length < 16
        },
        checkLoginInfo() {
            return ValidateEmail(this.postFrom.username) && this.checkPWDLen()
        },
        Login() {
            this.isClicked = true
            if (this.checkLoginInfo()) {
                this.$store.dispatch('LoginByUsername', this.postFrom)
                const redirect = this.$route.query.redirect
                this.isClicked = false
                if (redirect) {
                    this.$router.push({
                        path: redirect
                    })
                } else {
                    this.$router.push({
                        name: 'homepage'
                    })
                }
                
            } else {
                this.isClicked = false
                this.$message({
                    message: '账号或密码格式不正确',
                    type: 'success'
                })
            }
        }
    },
    computed: {
        IsClickedBTN() {
            return this.isClicked
        }
    }
}
</script>