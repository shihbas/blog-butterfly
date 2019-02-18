<template>
    <div>
        <!-- 轮播图 -->
        <slideshow v-if="!isMobile"/>

        <!-- 文章以及介绍 -->
        <div class="am-g am-g-fixed blog-fixed">
            <!-- 文章列表 -->
            <article-list />
            <command-bar />
        </div>
    </div>
</template>

<script>
import Slideshow from './components/Slideshow'
import ArticleList from './components/articleList'
import CommandBar from './components/commandBar'

export default {
    components: {
        Slideshow,
        ArticleList,
        CommandBar
    },
    data() {
        return {
            isMobile: false
        }
    },
    created() {
        this.isMobile = this.$store.getters.isMobile
    }
}
</script>
