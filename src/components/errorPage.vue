<template>
    <div>
        <router-view />
        <footer-show />
    </div>
</template>
<script>
import FooterShow from './footer/FooterShow'
export default {
    components: {
        FooterShow
    }
}
</script>