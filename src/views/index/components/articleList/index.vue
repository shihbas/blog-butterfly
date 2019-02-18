<template>
    <div class="am-u-md-8 am-u-sm-12">
        <article v-for="(article, index) in ArticleList" :key="index"
            class="am-g blog-entry-article" >
            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-img">
                <img :src="article.list_display_image" alt="" class="am-u-sm-12">
            </div>
            <div class="am-u-lg-6 am-u-md-12 am-u-sm-12 blog-entry-text">
                <h1><router-link :to="{ name: 'article', query: {code: article.code}}" >{{ article.title }}</router-link></h1>
                <p>{{ article.display_description }}</p>
                <p>{{ article.author_name }} 编写于 {{ article.created }}</p>
                <p>
                  <span class="am-icon-eye"> 浏览 {{ article.visit }}</span>&nbsp;|&nbsp;<span class="am-icon-smile-o"> 喜欢 {{ article.like }}</span>&nbsp;|&nbsp;<span class="am-icon-comments-o"> 评论 {{ article.comment }}</span>
                </p>
                <p v-if="article.article_tag_list.length > 0">
                  <span class="am-icon-tags">标签</span>
                  <small
                    v-for="tag in article.article_tag_list"
                    :key="tag.code">
                    /{{ tag.name }}/
                  </small>
                </p>
            </div>
        </article>

        <ul v-if="sumPage > 1" class="am-pagination am-pagination-centered">
            <li :class="[{'am-disabled': nowPage<=1},'am-pagination-prev']"><a href="" data-am-smooth-scroll="{speed: 500}" @click="handleGoPage(nowPage - 1)" >&laquo; Prev</a></li>
            <li class="am-pagination-centered am-active">{{ nowPage }}/{{ sumPage }}</li>
            <li :class="[{'am-disabled': nowPage>=sumPage},'am-pagination-next']"><a href="" data-am-smooth-scroll="{speed: 500}" @click="handleGoPage(nowPage + 1)">Next &raquo;</a></li>
        </ul>
    </div>
</template>


<script>

import { fetchIndexArticleList } from '@/api/index'

export default{
    props: {
        page: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            articleList:[],
            sumPage: 1,
            nowPage: 1
        }
    },
    methods: {
        getArticleList (page) {
            fetchIndexArticleList(page).then(response => {
                this.articleList = response.data.query_set;
                this.nowPage = response.data.page
                this.sumPage = response.data.page_sum
            })
        },
        handleGoPage(page) {
            this.getArticleList(page)
        },
    },
    created() {
        this.getArticleList(this.page)
    },
    computed: {
        ArticleList () {
            return this.articleList
        }
    }
}
</script>
