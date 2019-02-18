<template>
  <nav class="am-g am-g-fixed blog-fixed blog-nav">
    <button
      class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only blog-button"
      data-am-collapse="{target: '#blog-collapse'}"
    >
      <span class="am-sr-only">导航切换</span>
      <span class="am-icon-bars"></span>
    </button>

    <div class="am-collapse am-topbar-collapse" id="blog-collapse">
      <ul class="am-nav am-nav-pills am-topbar-nav">
        <li id="homepage" :class="{'am-active': ActiveTag === 'homepage'}">
          <router-link :to="{name: 'homepage'}">首页</router-link>
        </li>
        <li id="timeline" :class="{'am-active': ActiveTag === 'imgWall'}">
          <router-link :to="{name: 'imgWall'}">图片墙</router-link>
        </li>
        <li id="timeline" :class="{'am-active': ActiveTag === 'archive'}">
          <router-link :to="{name: 'archive'}">关于</router-link>
        </li>
      </ul>
      <div class="am-topbar-form am-topbar-right am-form-inline">
        <div class="am-form-group">
          <el-dropdown v-if="isLogin">
            <el-button type="text" style="color:#000">
              <img class="am-circle" width="35px" height="35px" :src="Avatar">
              {{ DisplayName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="gotoUserInfo">个人中心</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="logout">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else>
            <el-button type="text" @click="gotoLogin">登录</el-button>
            <el-button type="text" @click="gotoRegisterEmail">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    DisplayName() {
      return this.$store.getters.displayName;
    },
    Avatar() {
      return this.$store.getters.avatar;
    },
    OpenId() {
      return this.$store.getters.openId;
    },
    ActiveTag() {
      return this.$store.getters.activeTag;
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({
        name: "login",
        query: {
          redirect: this.$route.path
        }
      });
    },
    gotoRegisterEmail() {
      this.$router.push({
        name: "registerEmail",
        query: {
          redirect: this.$route.path
        }
      });
    },
    gotoUserInfo() {
      this.$router.push({
        name: "selfSpanBaseInfo"
      });
    },
    logout() {
      this.$store.dispatch("Logout");
    }
  }
};
</script>
