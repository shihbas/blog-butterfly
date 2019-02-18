<template>
    <div class="container auto">
        <div class="settings">
            <span class="icon">500</span>
            <h4>很抱歉！服务器出了一点故障，python狗 正在全力抢救</h4>
            <div>
                <router-link :to="{ name: 'homepage'}" >返回首页</router-link>
                <a href="https://weibo.com/u/6697158933" target="_blank">询问我发生了什么！</a>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/css" lang="css" scoped>
.auto {
    width: 500px;
    margin: 130px auto;
}

.container {
    background: url(images/erbg.png) no-repeat 560px top;
    /* text-align: center; */
    width: 100%;
    position: relative;
    z-index: 1;
}

.settings {
    padding-left: 100px;
    padding-bottom: 50px;
}

.settings .icon {
    width: 242px;
    height: 106px;
    font-size: 90px;
    /* text-align: center; */
}

.settings h4 {
    margin: 30px 0 15px 0;
    font-size: 18px;
    color: #000900;
}

.settings p {
    font-size: 14px;
    color: #999;
}

.settings > div {
    margin-top: 40px;
    font-size: 0;
}

.settings > div a {
    display: inline-block;
    padding: 10px 40px;
    border: 1px solid #2cb7fd;
    font-size: 15px;
    color: #2cb7fd;
    text-decoration: none;
}

.settings > div a:first-child {
    margin-right: 20px;
    color: #fff;
    background-color: #2cb7fd;
}
</style>
