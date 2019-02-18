<template>
    <!-- 轮播图 -->
    <div class="am-g am-g-fixed blog-fixed am-u-sm-centered blog-article-margin">
        <div data-am-widget="slider" class="am-slider am-slider-b1" data-am-slider='{"controlNav":false}' >
            <ul class="am-slides">
                <li v-for="(item, index) in ItemList" :key="index">
                    <img :src="item.display_img">
                    <div class="blog-slider-desc am-slider-desc ">
                        <div class="blog-text-center blog-slider-con">
                            <!-- <span><a href="" class="blog-color">{{ item.title }} &nbsp;</a></span>                -->
                            <h1 class="blog-h-margin"><a :href="item.link" target="_blank">{{ item.title }}</a></h1>
                            <p>{{ item.description }}</p>
                            <span class="blog-bor">{{ item.created }}</span>
                            <br><br><br><br><br><br><br>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { fetchIndexSlideshowList } from '@/api/index'

export default{
    data() {
        return {
            itemList:[]
        }
    },
    methods: {
        getSlideshowList () {
            fetchIndexSlideshowList().then(response => {
                this.itemList = response.data
            })
        }
    },
    created() {
        this.getSlideshowList()
    },
    computed: {
        ItemList () {
            return this.itemList
        }
    },
    updated() {
        $('.am-slider').flexslider();
    },
}
</script>

