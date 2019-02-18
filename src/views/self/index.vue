<template>
  <div class="am-g am-g-fixed blog-fixed">
    <info-nav-menu />
    <router-view />
  </div>
</template>

<script>
import InfoNavMenu from './components/navMenu'
export default {
  components: {
    InfoNavMenu
  }
}
</script>