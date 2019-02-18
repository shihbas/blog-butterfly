<template>
    <div class="am-g am-g-fixed blog-fixed blog-content">
        <ul
            data-am-widget="gallery"
            class="am-avg-sm-2 am-avg-md-3 am-avg-lg-4 am-gallery am-gallery-imgbordered"
            data-am-gallery="{  pureview: true }"
        >
            <li v-for="item in photoList" :key="item.code">
                <div class="am-gallery-item">
                    <a :href="item.link" :title="item.description">
                        <img :src="item.link" :alt="item.description"/>
                    </a>
                    <h4 class="am-gallery-title">{{ item.title }}</h4>
                    <div class="am-gallery-desc" v-if="item.is_original">
                        {{ headleOriginalText(item.original_time, item.original_place) }}
                    </div>
                    <div class="am-gallery-desc" v-else>
                        <a :href="item.source_link" target="_blank">
                            {{ '来源于 '+item.source_name }}
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import amazeui from 'amazeui'
import { fetchPhotoWallList } from '@/api/photowall'

export default {
    data() {
        return {
            photoList: []
        }
    },
    created() {
        this.getPhotoList()
    },
    methods: {
        getPhotoList() {
            fetchPhotoWallList().then(response => {
                this.photoList = response.data
                this.$nextTick(() => {
                    amazeui.gallery.init()
                })
            })
        },
        headleOriginalText(o_time, o_place) {
            if ( o_place == null) {
                return `拍摄于 ${o_time}`
            } else {
                return `拍摄于 ${o_time}、${o_place}`
            }
        }
    }
}
</script>