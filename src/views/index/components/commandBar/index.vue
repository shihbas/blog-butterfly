<template>
    <div class="am-u-md-4 am-u-sm-12 blog-sidebar">
        <hot-articleList />
        <tag-list />
        <!-- <contact-me /> -->
    </div>
</template>

<script>
import HotArticleList from './HotArticleList'
// import ContactMe from './ContactMe'
import TagList from './TagList'

export default {
    components: {
        HotArticleList,
        // ContactMe,
        TagList,
    }
}
</script>
