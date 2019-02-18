<template>
    <div class="am-g am-g-fixed blog-fixed blog-content">
      <article-show :detail-info="detailInfo"></article-show>
      <!-- <div class="am-u-sm-12">
        <div class="blog-clear-margin blog-sidebar-widget blog-bor am-u-md-6 am-u-sm-12">
          <h2 class="blog-title"><span>喜欢</span></h2>
          <div class="am-u-sm-12 blog-clear-padding">
            <p>
              {{LikeNumber>0?`有${LikeNumber}个人喜欢这篇文章`: '还没有人喜欢这篇文章'}}<br>
              点击-><span :class="[{'am-danger': IsLike} , 'am-icon-btn', 'am-icon-smile-o' ,'hank-like-number']" @click="headleLikeArticle"></span><- <b>{{ IsLike?'取消':'确认' }}</b>喜欢
            </p>
          </div>
        </div>
        <div class="blog-clear-margin blog-sidebar-widget blog-bor am-u-md-6 am-u-sm-12">
          <h2 class="blog-title"><span>评论</span></h2>
          <div class="am-u-sm-12 blog-clear-padding">
            <p>
              {{CommentNumber>0?`有${CommentNumber}条评论`: '还没有人评论这篇文章'}}<br>
              点击-><span class="am-icon-btn am-primary am-icon-commenting hank-comment-number" @click="clickef"></span><-发表评论
            </p>
          </div>
        </div>
      </div> -->
      <article-comment :likeNumber="likeNumber" :commentNumber="commentNumber" :isLike="isLike"></article-comment>
    </div>
</template>

<script>
import marked from 'marked'
import ArticleShow from './components/articleShow'
import ArticleComment from './components/articleComment'
import { fetchArticleDetail } from '@/api/article'

export default {
    data() {
        return {
            detailInfo: {},
            likeNumber: 0,
            commentNumber: 0,
            isLike: false
        }
    },
    components: {
        ArticleShow,
        ArticleComment
    },
    created() {
        const code = this.$route.query.code
        if (code) {
            this.fetchData(code)
        } else {
            this.$message({
                message: '没有文章code',
                type: 'error'
            })
            this.$router.push({
                name: 'notFound'
            })
        }
    },
    methods: {
      fetchData(code) {
        fetchArticleDetail(code).then(response => {
            var detailContent = ''
            if (response.data.edit_type === 1) {
                detailContent = marked(response.data.content, { sanitize: true })
            } else {
                detailContent = response.data.content
            }
            this.detailInfo = {
                title: response.data.title,
                authorName: response.data.author_name,
                created: response.data.created,
                listDisplayImage: response.data.list_display_image,
                content: detailContent
            }
            this.likeNumber = response.data.like
            this.isLike = response.data.is_like
            this.commentNumber = response.data.comment
        }).catch(err => {
            this.$route.push({
                name: 'notFound'
            })
        })
      }
    }
}
</script>
