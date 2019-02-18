<template>
    <div class="am-g am-g-fixed blog-fixed">
        <div class="am-u-md-8 am-u-sm-12">
            <div v-for="item in list" :key="item.code">
                <timeline :timeline-theme="item.code | randomColor">
                    <timeline-title>
                        <span>{{ item.year }}年</span><br/>
                        <h4>{{ item.title }}</h4><br/>
                        <div v-html="item.content">
                        </div>
                    </timeline-title>
                    <timeline-item :bg-color="dot.code | randomColor" v-for="dot in item.item_list" :key="dot.code" class="jump">
                        <span>{{ dot.date_str }}</span><br>
                        <h5>{{ dot.title }}</h5><br/>
                        <div v-html="dot.content">
                        </div>
                        <br>
                        <br>
                    </timeline-item>
                </timeline>
                <hr/>
            </div>
        </div>
        <div class="am-u-md-4 am-u-sm-12">
            <AboutMe />
            <Working />
            <Movie />
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import { fetchTimeLine } from '@/api/timeline'
import AboutMe from './components/AboutMe'
import Working from './components/Working'
import Movie from './components/Movie'

export default {
    components: {
        Timeline,
        TimelineItem,
        TimelineTitle,
        AboutMe,
        Working,
        Movie
    },
    data() {
        return {
            list: []
        }
    },
    filters: {
        randomColor() {
            const colorMap = [
                "#ef5b9c",
                "#d64f44",
                "#f15a22",
                "#aa2116",
                "#840228",
                "#6b2c25",
                "#53261f",
                "#fdb933",
                "#228fbd",
                "#008792",
                "#00ae9d",
                "#007d65",
                "#6950a1",
                "#2a5caa",
                "#ea66a6",
                "#1d1626"
            ]
            return colorMap[Math.floor(Math.random() * colorMap.length)]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            fetchTimeLine().then(response => {
                this.list = response.data
                this.$nextTick(() => {
                    $(function() {
                        $('[class*=jump]').scrollspy({
                                    animation: 'slide-right',
                                    delay: 100,
                                    repeat: true
                        });
                    });
                })
            })
        }
    }
}
</script>
