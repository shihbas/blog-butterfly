<template>
  <div class="am-u-sm-12">
    <article class="am-article blog-article-p">
      <div class="hank-box">
        <div class="am-article-hd">
          <h1 class="am-article-title blog-text-center">{{ detailInfo.title }}</h1>
          <p class="am-article-meta blog-text-center">
            <!-- <span><a href="#" class="blog-color"> {{ item.tag_name }} &nbsp;</a></span>- -->
            <span><a href="#">@{{ detailInfo.authorName}} &nbsp;</a></span>-
            <span><a href="#">{{ detailInfo.created }}</a></span>
          </p>
        </div>
        <div class="hank-displayImg">
            <img :src="detailInfo.listDisplayImage" alt="" class="blog-entry-img blog-article-margin">
        </div>
      </div>

      <div class="hank-articleContent" v-html="detailInfo.content">
          <!-- 正文 -->
      </div>
    </article>
    <hr />
  </div>
</template>

<script>

export default {
  props: {
    detailInfo: {
      type: Object
    }
  }
};
</script>
<style rel="stylesheet/css" lang="css" scoped>
div.hank-box {
  width: 75%;
  margin: 10px auto;
}
div.hank-displayImg {
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
}
div.hank-displayImg img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  margin: auto;
  z-index: -1;
  *zoom: 1;
}
div.hank-displayImg:before {
  content: "";
  display: inline-block;
  padding-bottom: 70%;
  width: 0.1px; /*必须要有数值，否则无法把高度撑起来*/
  vertical-align: middle;
}
</style>
