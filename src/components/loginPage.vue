<template>
  <div class="log">
    <router-view></router-view>
    <FooterShow/>
  </div>
</template>

<script>
import FooterShow from './footer/FooterShow'

export default{
    name: 'Login',
    components: {
            FooterShow
    }
}
</script>
