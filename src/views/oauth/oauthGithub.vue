<template>
  <el-dialog
    title="正在授权..."
    width="40%"
    :visible.sync="showDialog"
    :before-close="handleClose">
    <span>正在校验授权结果，由于github服务器在国外可能比较慢请耐心等待</span>
  </el-dialog>
</template>

<script>
import { OAuthGithub } from '@/api/oauth'

export default {
    name: 'OauthGithub',
    data() {
        return {
            code: '',
            showDialog: true
        }
    },
    created() {
        this.code = this.$route.query.code
        OAuthGithub(this.code).then(response => {
            this.$message({
                message: 'github授权登录成功！(๑´ㅂ`๑)',
                type: 'success'
            })
            this.$router.push({
                name: 'homepage'
            })
        }).catch(err => {
            this.$confirm('授权Github登录失败！QAQ 通知下我谢谢(+﹏+)~  先送你回首页吧！').then(_ => {
                this.$router.push({
                    name: 'homepage'
                })
            })
        })
    },
    methods: {
        handleClose() {
            this.$confirm('返回首页？')
                .then(_ => {
                this.$router.push({
                    name: 'homepage'
                })
            })
        }
    }
}
</script>
