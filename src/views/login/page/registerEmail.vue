<template>
    <div class="am-g">
        <div class="am-u-lg-3 am-u-md-6 am-u-sm-8 am-u-sm-centered log-content">
            <h1 class="log-title am-animation-slide-top">邮箱注册</h1>
            <br>
            <form class="am-form">
                <div class="am-input-group am-radius am-animation-slide-left">
                    <el-tooltip :disabled="notTipEmail" content="请输入正确的邮箱格式" placement="top" effect="light">
                        <input type="text" class="am-radius" placeholder="邮箱"
                            @blur.prevent="checkEmail"
                            v-model="postFrom.email"
                            required/>
                    </el-tooltip>
                    <span class="am-input-group-label log-icon am-radius"><i class="am-icon-user am-icon-sm am-icon-fw"></i></span>
                </div>
                <br>
                <div class="am-input-group am-animation-slide-left log-animation-delay">   
                    <el-tooltip :disabled="notTipPWD" content="请输入长度在10-16位的密码" placement="bottom" effect="light">    
                        <input type="password" class="am-form-field am-radius log-input" placeholder="密码"
                            @blur.prevent="checkPWD"
                            v-model="postFrom.password1"
                            required>
                    </el-tooltip>
                    <span class="am-input-group-label log-icon am-radius"><i class="am-icon-lock am-icon-sm am-icon-fw"></i></span>
                </div>
                <br>
                    <div class="am-input-group am-animation-slide-left log-animation-delay">   
                    <el-tooltip :disabled="notTipPWD" content="请输入长度在10-16位的密码" placement="bottom" effect="light">    
                        <input type="password" class="am-form-field am-radius log-input" placeholder="再输入一次"
                            @blur.prevent="checkPWD"
                            v-model="postFrom.password2"
                            required>
                    </el-tooltip>
                    <span class="am-input-group-label log-icon am-radius"><i class="am-icon-lock am-icon-sm am-icon-fw"></i></span>
                </div>
                <br>
                <button 
                    class="am-btn am-btn-primary am-btn-block am-btn-lg am-radius am-animation-slide-bottom log-animation-delay" 
                    @click.self.prevent="handleEmailRegister"
                    :disabled="IsClickedBTN"
                >
                注  册
                </button>
                <p class="am-animation-slide-bottom log-animation-delay">
                    <router-link :to="{name: 'homepage'}">回首页?</router-link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link :to="{name: 'login'}">登录?</router-link>
                </p>
                <div class="am-btn-group  am-animation-slide-bottom log-animation-delay-b">
                  <h2>使用第三方授权注册</h2>
                  <a href="https://api.weibo.com/oauth2/authorize?response_type=code&client_id=4289819484&redirect_uri=https%3A%2F%2Fwww.python-dog.com%2Foauth%2Fweibo&scope=all+follow_app_official_microblog&state=python_dog" class="am-btn am-btn-danger am-btn-sm"><i class="am-icon-weibo am-icon-sm">微博</i></a>
                  <a href="https://github.com/login/oauth/authorize?response_type=code&client_id=4356fcd402e5b0f205d9&redirect_uri=https%3A%2F%2Fwww.python-dog.com%2Foauth%2Fgithub&scope=user&state=python_dog" class="am-btn am-btn-secondary am-btn-sm"><i class="am-icon-github am-icon-sm">github</i></a>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

import { ValidateEmail } from '@/utils/common'
import { emailRegister } from '@/api/login'

export default {
    name: 'RegisterEmail',
    data() {
        return {
            notTipEmail: false,
            notTipPWD: false,
            postFrom: {
                email: '',
                password1: '',
                password2: '',
            },
            isClicked: false
        }
    },
    methods: {
        checkEmail() {
            this.notTipEmail = ValidateEmail(this.postFrom.email)
        },
        checkPWD() {
            this.notTipPWD = this.checkPWDLen()
        },
        checkPWDSame() {
            return this.postFrom.password1 === this.postFrom.password2
        },
        checkPWDLen() {
            return this.postFrom.password1.length > 9 && this.postFrom.password1.length < 16
        },
        handleEmailRegister() {
            this.isClicked = true
            if (ValidateEmail(this.postFrom.email)) {
                if (this.checkPWDLen()) {
                    if (this.checkPWDSame()) {
                        emailRegister(this.postFrom).then(response => {
                            this.$message({
                                message: '邮件发送成功，请查看邮件确认注册！',
                                type: 'success'
                            })
                            this.$router.push({
                                name: 'homepage'
                            })
                        }).catch(err => {
                            this.isClicked = false
                        })
                    } else {
                        this.isClicked = false
                        this.$message({
                            message: '两次密码不一致',
                            type: 'danger'
                        })
                    }
                } else {
                    this.isClicked = false
                    this.$message({
                        message: '请输入长度在10-16位的密码',
                        type: 'danger'
                    })
                }
                
            } else {
                this.isClicked = false
                this.$message({
                    message: '账号格式不正确',
                    type: 'danger'
                })
            }
        },
    },
    computed: {
        IsClickedBTN() {
            return this.isClicked
        }
    }
}
</script>