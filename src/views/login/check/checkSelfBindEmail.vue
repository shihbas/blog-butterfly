<template>
  <el-dialog title="绑定结果" width="40%" :visible.sync="showDialog" :before-close="handleClose">
    <span v-if="CheckResult === -1">正在校验绑定邮箱信息</span>
    <span v-else-if="CheckResult === 1">绑定成功!</span>
    <span v-else-if="CheckResult === 0">绑定失败！失败原因[{{ ResultText }}]！</span>
    <span v-else>未知的结果！</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回首页</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { checkSelfBindEmail } from "@/api/user";

export default {
  name: "CheckSelfBindEmail",
  data() {
    return {
      checkSuccess: -1,
      result: "",
      showDialog: false
    };
  },
  created() {
    var data = {
      code: this.$route.query.code
    };
    checkSelfBindEmail(data).then(response => {
      this.result = response.data.text;
      this.checkSuccess = response.data.success;
      this.showDialog = true;
      this.$message({
        message: "校验完毕！请查看结果",
        type: "success"
      });
    });
  },
  methods: {
    handleClose() {
      if (this.checkSuccess === -1) {
        this.$confirm("结果还未返回，确认要回到主页么？").then(_ => {
          this.$router.push({
            name: "homepage"
          });
        });
      } else if (this.checkSuccess === 0) {
        this.$confirm("重置失败QAQ,确认要回到主页么？").then(_ => {
          this.$router.push({
            name: "homepage"
          });
        });
      } else if (this.checkSuccess === 1) {
          this.$router.push({
            name: "homepage"
          });
      } else {
        this.$confirm("未知的问题QAQ,先送你回主页吧！").then(_ => {
          this.$router.push({
            name: "homepage"
          });
        });
      }
    },
    gotoLogin() {
      this.$router.push({
        name: "login"
      });
    }
  },
  computed: {
    CheckResult() {
      return this.checkSuccess;
    },
    ResultText() {
      return this.result;
    }
  }
};
</script>