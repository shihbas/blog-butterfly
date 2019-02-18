<template>
  <div class="am-u-md-9 am-u-sm-12">
    <div class="hank-self-reset-pwd-view">
      <el-form status-icon label-width="100px" size="mini"
        ref="resetPWDFrom"
        :rules="pwdRules"
        :model="resetPWDFrom">
        <el-form-item label="新的密码" prop="pwd1">
          <el-input type="password" v-model="resetPWDFrom.pwd1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input type="password" v-model="resetPWDFrom.pwd2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="headleClearFrom">清空</el-button>
          <el-button type="primary" @click="headleResetPWD" v-if="!ResetBtnClick">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {validPWDLength} from '@/utils/validator'
import {changeSelfPWD} from '@/api/user'

export default {
  data() {
    var validCheckPWD = (rule, value, callback) => {
      if (this.resetPWDFrom.pwd1 !== value) {
        callback(new Error('两次输入密码不一致!'))
      }
      callback()
    }
    return {
      resetPWDFrom: {
        pwd1: '',
        pwd2: ''
      },
      pwdRules: {
        pwd1: [
          {validator: validPWDLength, trigger: 'blur'},
          {required: true, message: "不能为空"}
        ],
        pwd2: [
          {validator: validCheckPWD, trigger: 'blur'},
          {required: true, message: "不能为空"}
        ]
      },
      btnClick: false
    }
  },
  methods: {
    headleResetPWD() {
      this.$refs["resetPWDFrom"].validate((valid) => {
        // 校验表单
        if (valid) {
          this.btnClick = true
          changeSelfPWD(this.resetPWDFrom).then(response => {
            this.$message({
              message: '修改成功, 请重新登录',
              type: 'success'
            })
            // 客户端登出就可以  后端会被登出
            this.$store.dispatch("ClientLogout")
            this.$router.push({
              name: "login"
            })
          }).catch(err => {
            this.btnClick = false
          })
        }
      })
    },
    headleClearFrom() {
      this.$refs["resetPWDFrom"].resetFields()
    }
  },
  computed: {
    ResetBtnClick() {
      return this.btnClick
    }
  }
}
</script>

<style>
.hank-self-reset-pwd-view {
  margin-top: 20px;
  min-width: 300px;
  max-width: 500px;
}
</style>
