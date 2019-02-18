<template>
    <div>
        <hr>
        <head-menu></head-menu>
        <hr>
        <router-view></router-view>
        <hr>
        <footer-show />
    </div>
</template>
<script>
    import HeadMenu from './head/headMenu'
    import FooterShow from './footer/FooterShow'
    export default {
        components: {
            HeadMenu,
            FooterShow
        }
    }
</script>