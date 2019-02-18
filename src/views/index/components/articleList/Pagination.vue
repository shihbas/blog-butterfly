<template>
    <ul class="am-pagination am-pagination-centered">
        <li class="am-pagination-prev am-disabled"><a href="">&laquo; Prev</a></li>
        <li class="am-pagination-centered am-active"><a href="">1</a></li>
        <li class="am-pagination-centered"><a href="">2</a></li>
        <li class="am-pagination-centered"><a href="">3</a></li>
        <li class="am-pagination-next"><a href="">Next &raquo;</a></li>
    </ul>
</template>

<script>
    export default {
        props : {
            maxPageNumber: {
                type: Number,
                default: 1
            },
            NowPageNumber: {
                type: Number,
                default: 1
            }
        }
    }
</script>
