<template>
  <el-dialog
    title="注册结果"
    width="40%"
    :visible.sync="showDialog"
    :before-close="handleClose">
    <span v-if="CheckResult === -1">正在校验注册信息</span>
    <span v-else-if="CheckResult === 1">注册成功！去登录吧！</span>
    <span v-else-if="CheckResult === 0">注册失败！失败原因[{{ ResultText }}]！</span>
    <span v-else>未知的注册结果！</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回首页</el-button>
      <el-button type="primary" @click="gotoLogin" v-if="CheckResult == 1">去登录</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { fetchEmailRegister } from '@/api/login'

export default {
  name: 'CheckRegisterEmail',
  data() {
    return {
      checkSuccess: -1,
      result: '',
      showDialog: false
    }
  },
  created() {
    var data = {
      code: this.$route.query.code
    }
    fetchEmailRegister(data).then(response => {
      this.result = response.data.text
      this.checkSuccess = response.data.success
      this.showDialog = true
      this.$message({
        message: '校验完毕！请查看结果',
        type: 'success'
      })
    })
  },
  methods: {
    handleClose() {
      if (this.checkSuccess === -1) {
        this.$confirm('注册结果还未返回，确认要回到主页么？')
        .then(_ => {
          this.$router.push({
            name: 'homepage'
          })
        })
      } else if (this.checkSuccess === 0) {
        this.$confirm('注册失败QAQ,确认要回到主页么？')
        .then(_ => {
          this.$router.push({
            name: 'homepage'
          })
        })
      } else if (this.checkSuccess === 1) {
        this.$confirm('注册成功啦！不去登录？要回到主页么？')
        .then(_ => {
          this.$router.push({
            name: 'homepage'
          })
        })
      } else {
        this.$confirm('未知的问题QAQ,先送你回主页吧！')
        .then(_ => {
          this.$router.push({
            name: 'homepage'
          })
        })
      }
    },
    gotoLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    CheckResult() {
      return this.checkSuccess
    },
    ResultText() {
      return this.result
    }
  }
}
</script>