<template>
    <div class="blog-sidebar-widget blog-bor">
        <h2 class="blog-title"><span>热门文章</span></h2>
        <ul class="am-list">
            <li v-for="item in HotList" :key="item.open_code">
              <router-link :to="{ name: 'article', query: {code: item.open_code}}" >{{ item.title | CutTitleLength}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

import {fetchIndexHotArticleList} from '@/api/index'

export default {
  filters: {
    CutTitleLength(title) {
      if(title.length > 20) {
        return title.substr(0, 18) + '...'
      } else {
        return title
      }
    }
  },
  created() {
    console.log("asdhqwk")
    fetchIndexHotArticleList().then(response => {
      this.hotList = response.data
    })
  },
  data() {
    return {
      hotList: []
    }
  },
  computed: {
    HotList() {
      return this.hotList
    }
  },
}
</script>
