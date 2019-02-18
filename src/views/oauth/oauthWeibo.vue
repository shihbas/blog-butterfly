<template>
<p>weibo授权登录页</p>
</template>

<script>
import { OAuthWeibo } from '@/api/oauth'

export default {
    name: 'OAuthWeibo',
    data() {
        return {
            code: '',

        }
    },
    created() {
        this.code = this.$route.query.code
        OAuthWeibo(this.code).then(response => {
            this.$message({
                message: 'weibo授权登录成功！(๑´ㅂ`๑)',
                type: 'success'
            })
            this.$router.push({
                name: 'homepage'
            })
        }).catch(err => {
            this.$confirm('授权WeiBo登录失败！QAQ 通知下我谢谢(+﹏+)~  先送你回首页吧！').then(_ => {
                this.$router.push({
                    name: 'homepage'
                })
            })
        })
    },
}
</script>
