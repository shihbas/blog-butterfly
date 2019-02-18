<template>
  <div class="blog-clear-margin blog-sidebar-widget blog-bor am-g">
    <h2 class="blog-title"><span>分类标签(正在开发)</span></h2>
    <div class="am-u-sm-12 blog-clear-padding">
      <a href="#" class="blog-tag" v-for="(item, index) in itemList" :key="index">{{ item.name }}</a>
    </div>
  </div>
</template>

<script>
import { fetchIndexTopTagList } from '@/api/index'
export default{
    data() {
        return {
            itemList:[]
        }
    },
    methods: {
        getArticleTagList () {
            fetchIndexTopTagList().then(response => {
                this.itemList = response.data;
            })
        }
    },
    created() {
        this.getArticleTagList()
    },
    computed: {
        ItemList () {
            return this.itemList
        }
    }
}
</script>
