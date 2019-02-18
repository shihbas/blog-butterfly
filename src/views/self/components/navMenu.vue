<template>
  <div class="am-u-md-3 am-u-sm-12">
    <el-menu :default-active="ActiveTag" :unique-opened="true">
      <el-submenu index="selfSpanInfo">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>个人资料</span>
        </template>
        <el-menu-item index="selfSpanBaseInfo" @click="gotoSelfBaseInfo">基本信息</el-menu-item>
      </el-submenu>
      <el-submenu index="selfSetting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="selfSpanChangePWD" @click="gotoSetChangePWD">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      activeTag: "selfSpanBaseInfo"
    }
  },
  computed: {
    ActiveTag() {
      return this.activeTag
    }
  },
  created() {
    this.activeTag = this.$route.meta.tagName
  },
  methods: {
    gotoSelfBaseInfo() {
      this.activeTag = 'selfSpanBaseInfo'
      this.$router.push({
        name: "selfSpanBaseInfo"
      })
    },
    gotoSetChangePWD() {
      this.activeTag = 'selfSpanChangePWD'
      this.$router.push({
        name: "selfSpanChangePWD"
      })
    }
  },
}
</script>
