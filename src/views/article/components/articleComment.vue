<template>
  <div class="am-u-sm-12">
    <div class="am-u-sm-12">
      <div class="blog-clear-margin blog-sidebar-widget blog-bor am-u-md-6 am-u-sm-12">
        <h2 class="blog-title"><span>喜欢</span></h2>
        <div class="am-u-sm-12 blog-clear-padding">
          <p>
            {{LikeNumber>0?`有${LikeNumber}个人喜欢这篇文章`: '还没有人喜欢这篇文章'}}<br>
            点击 <span :class="[{'am-danger': IsLike} , 'am-icon-btn', 'am-icon-smile-o' ,'hank-like-number']" @click="headleLikeArticle"></span> <b>{{ IsLike?'取消':'确认' }}</b>喜欢
          </p>
        </div>
      </div>
      <div class="blog-clear-margin blog-sidebar-widget blog-bor am-u-md-6 am-u-sm-12">
        <h2 class="blog-title"><span>评论</span></h2>
        <div class="am-u-sm-12 blog-clear-padding">
          <p>
            {{CommentNumber>0?`有${CommentNumber}条评论`: '还没有人评论这篇文章'}}<br>
            点击 <span class="am-icon-btn am-primary am-icon-commenting hank-comment-number" @click="headleOpenCommentArticle"></span> 发表评论
          </p>
        </div>
      </div>
    </div>
    <h2 class="blog-title"><span>评论</span></h2>
    <hr>
    <section class="comments hank-comment" v-if="commentList.length > 0">
      <article class="comment" v-for="comment in commentList" :key="comment.code">
        <span class="comment-img">
          <img :src="comment.commenter_avatar" :alt="comment.commenter_nickname" width="50" height="50">
        </span>
        <div class="comment-body">
          <div class="text">
            <p v-html="comment.content"></p>
          </div>
          <p class="attribution">
            来自&nbsp;<b>{{ comment.commenter_nickname }}</b>&nbsp;-&nbsp;{{ comment.created_time }}&nbsp;&nbsp;
            <span class="am-icon-remove hank-comment-click-span" v-if="user.openID===comment.commenter_code" @click="headleRemoveMainComment(comment)">删除</span>
            <span class="am-icon-commenting hank-comment-click-span" v-else @click="headleOpenRelayDialog(comment.code, comment.commenter_code ,comment.commenter_nickname)">回复</span>
          </p>
          <br>
          <section class="comments" v-if="comment.relay_list.length > 0">
            <article class="comment" v-for="relayItem in comment.relay_list" :key="relayItem.code">
              <span class="comment-img">
                <img :src="relayItem.reply_user_avatar" :alt="relayItem.reply_user_nickname" width="50" height="50">
              </span>
              <div class="comment-body">
                <div class="text">
                  <p v-html="relayItem.content"></p>
                </div>
                <p class="attribution">
                  <b>{{ relayItem.reply_user_nickname }}</b>&nbsp;回复&nbsp;<b>{{ relayItem.commenter_nickname }}</b>&nbsp;-&nbsp;{{ relayItem.created_time }}&nbsp;&nbsp;
                  <span class="am-icon-remove hank-comment-click-span" v-if="user.openID===relayItem.reply_user_code" @click="headleRemoveRelayComment(relayItem, comment.code)">删除</span>
                  <span class="am-icon-commenting hank-comment-click-span" v-else @click="headleOpenRelayDialog(comment.code, relayItem.commenter_code, relayItem.commenter_nickname)">回复</span>
                </p>
              </div>
            </article>
          </section>
        </div>
      </article>
    </section>
    <div class="blog-clear-margin blog-sidebar-widget blog-boram-u-sm-12" v-else>
      <div class="am-u-sm-12 blog-clear-padding">
        <p>
          评论区空的和我钱包一样（手动摊手)
        </p>
      </div>
    </div>
    <!-- 评论器 -->
    <el-dialog title="写下你的评论" width="400px" :visible.sync="commentDialog.visible" @close="headleCloseCommentArticle">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="支持markdown语法"
        v-model="commentDialog.content" v-show="!commentDialog.preview">
      </el-input>
      <div v-show="commentDialog.preview" v-html="CommentContent"></div>
      <div slot="footer" class="dialog-footer">
        <span>当前文本:{{CommentWords}}/最大文本长度:{{maxCommentLen}}</span><br>
        <el-button :type="commentDialog.preview?'danger':'success'" @click="previewCommentArticle">{{commentDialog.preview?'编辑':'预览'}}</el-button>
        <el-button type="primary" @click="headleSaveComment">评论</el-button>
      </div>
    </el-dialog>
    <!-- 回复评论器 -->
    <el-dialog :title="'回复'+relayDialog.commenterName" width="400px" :visible.sync="relayDialog.visible" @close="headleCloseRelayDialog">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="支持markdown语法"
        v-model="relayDialog.content" v-show="!relayDialog.preview">
      </el-input>
      <div v-show="relayDialog.preview" v-html="RelayContent"></div>
      <div slot="footer" class="dialog-footer">
        <span>当前文本:{{RelayWords}}/最大文本长度:{{maxCommentLen}}</span><br>
        <el-button :type="relayDialog.preview?'danger':'success'" @click="previewRelayCommentArticle">{{relayDialog.preview?'编辑':'预览'}}</el-button>
        <el-button type="primary" @click="saveRelayComment">回复</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import marked from 'marked'
import { addArticleComment, fetchArticleComments, setLikeArticle, cancelLikeArticle, deleteArticleComment, deleteArticleReplyComment, addArticleReplyComment } from '@/api/article'

export default {
  props: {
    likeNumber: {
      type: Number,
      default: 0
    },
    commentNumber: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentList: [],
      articleCode: '',
      like: {
        click: false
      },
      commentDialog: {
        visible: false,
        preview: false,
        content: ""
      },
      relayDialog: {
        visible: false,
        preview: false,
        content: "",
        commenterName: "",
        commenterCode: "",
        commentCode: ""
      },
      maxCommentLen: 80,
      user: {
        isLogin: false,
        openID: ''
      },
    }
  },
  created() {
    this.articleCode = this.$route.query.code
    if(this.articleCode.length > 0) {
      this.headleGetCommentList(this.articleCode, 1)
    }
  },
  methods: {
    headleGetCommentList(code, page) {
      fetchArticleComments(code, page).then(response => {
        this.commentList = response.data.items
        this.user.isLogin = this.$store.getters.isLogin
        this.user.openID = this.$store.getters.openId
      })
    },
    headleLikeArticle() {
      if(!this.user.isLogin) {
        this.$confirm('需要登录后才能增加喜欢，是否去登录？', '登录提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 去登录
            this.$router.push({
              name: 'login'
            })
          })
          return
      }
      if (this.like.click) {
        return
      }

      this.like.click = true

      if (this.isLike) {
        cancelLikeArticle(this.articleCode).then(response => {
          this.likeNumber -= 1
          this.isLike = !this.isLike
          this.like.click = false
        }).catch(err => {
          this.like.click = false
        })
      } else {
        setLikeArticle(this.articleCode).then(response => {
          this.likeNumber += 1
          this.isLike = !this.isLike
          this.like.click = false
        }).catch(err => {
          this.like.click = false
        })
      }
    },
    headleOpenCommentArticle() {
      if(!this.user.isLogin) {
        this.$confirm('需要登录后才能进行评论，是否去登录？', '登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 去登录
          this.$router.push({
            name: 'login'
          })
        })
        return
      }
      // 打开评论器
      this.commentDialog.visible = true
    },
    headleCloseCommentArticle() {
      // 关闭评论器
      this.commentDialog.visible = false
      this.commentDialog.preview = false
      this.commentDialog.content = ''
    },
    headleSaveComment() {
      if(this.CommentWords < 1 || this.CommentWords > this.maxCommentLen) {
        this.$message({
          message: '评论内容长度有问题',
          type: 'error'
        })
        return
      }
      const data = {
        article_code: this.articleCode,
        content: marked(this.commentDialog.content, { sanitize: true })
      }
      addArticleComment(data).then(response => {
        this.headleGetCommentList(this.articleCode, 1)
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.commentNumber++
      }).catch(err => {
        this.$message({
          message: '评论失败',
          type: 'success'
        })
      })

      this.commentDialog.visible = false
      this.commentDialog.preview = false
      this.commentDialog.content = ''
    },
    previewCommentArticle() {
      // 预览评论 markdown
      this.commentDialog.preview = !this.commentDialog.preview
    },
    headleRemoveMainComment(item) {
      this.$confirm(`若删除${item.created_time}的该条评论，之下的回复也会被一并删除，是否删除？`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 去删除
        const query = {
          comment_code: item.code
        }
        let number = item.relay_list.length + 1
        this.RemoveMainComment(query, number)
      })
    },
    headleRemoveRelayComment(item, commentCode) {
      this.$confirm(`要删除${item.created_time}对${item.commenter_nickname}的回复么？`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 去删除
        const query = {
          reply_comment_code: item.code,
          original_comment_code: commentCode
        }
        let number = 1
        this.RemoveRelayComment(query, number)
      })
    },
    RemoveMainComment(query, number) {
      // 删除主要评论
      deleteArticleComment(query).then(response => {
        this.headleGetCommentList(this.articleCode, 1)
        this.commentNumber -= number
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    RemoveRelayComment(query, number) {
      // 删除评论回复
      deleteArticleReplyComment(query).then(response => {
        this.headleGetCommentList(this.articleCode, 1)
        this.commentNumber -= number
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    headleOpenRelayDialog(commentCode, commenterCode, commenterName) {
      if(!this.user.isLogin) {
        this.$confirm('需要登录后才能进行评论，是否去登录？', '登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 去登录
          this.$router.push({
            name: 'login'
          })
        })
        return
      }
      // 打开回复评论器
      this.relayDialog.commenterName = commenterName
      this.relayDialog.commenterCode = commenterCode
      this.relayDialog.commentCode = commentCode
      this.relayDialog.visible = true
    },
    headleCloseRelayDialog() {
      // 关闭回复评论器
      this.relayDialog.visible = false
      this.relayDialog.preview = false
      this.relayDialog.content = ''
    },
    previewRelayCommentArticle() {
      // 预览评论回复 markdown
      this.relayDialog.preview = !this.relayDialog.preview
    },
    saveRelayComment() {
      if(this.RelayWords < 1 || this.RelayWords > this.maxCommentLen) {
        this.$message({
          message: '评论内容长度有问题',
          type: 'error'
        })
        return
      }
      const data = {
        original_comment_code: this.relayDialog.commentCode,
        comment_user_code: this.relayDialog.commenterCode,
        content: marked(this.relayDialog.content, { sanitize: true })
      }
      addArticleReplyComment(data).then(response => {
        this.headleGetCommentList(this.articleCode, 1)
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.commentNumber++
      }).catch(err => {
        this.$message({
          message: '评论失败',
          type: 'success'
        })
      })

      this.relayDialog.visible = false
      this.relayDialog.preview = false
      this.relayDialog.content = ''
    }
  },
  computed: {
      LikeNumber() {
        return this.likeNumber
      },
      IsLike() {
        return this.isLike
      },
      CommentNumber() {
        return this.commentNumber
      },
      CommentWords() {
        return this.commentDialog.content.length
      },
      CommentContent() {
        return marked(this.commentDialog.content, { sanitize: true })
      },
      RelayContent() {
        return marked(this.relayDialog.content, { sanitize: true })
      },
      RelayWords() {
        return this.relayDialog.content.length
      }
    }
}
</script>

<style>

article, aside, figure, footer, header, hgroup, 
menu, nav, section { display: block; }

.hank-comment {
    margin: 20px auto;
    font: 16px/1.4 Arial, sans-serif;
    /* background: #f3eee9; */
}

.hank-comment > p {
    margin: 0 0 1em;
}

.comment {
    overflow: hidden;
    padding: 0 0 1em;
    /* border-bottom: 1px solid #ddd; */
    margin: 0 0 1em;
    *zoom: 1;
}

.comment-img {
    float: left;
    margin-right: 33px;
    border-radius: 5px;
    overflow: hidden;
}

.comment-img img {
    display: block;
}

.comment-body {
    overflow: hidden;
}

.comment .text {
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background: #fff;
}

.comment .text p:last-child {
    margin: 0;
}

.comment .attribution {
    margin: 0.5em 0 0;
    font-size: 14px;
    color: #666;
}

/* Decoration */

.comments,
.comment {
    position: relative;
}

.comments:before,
.comment:before,
.comment .text:before {
    content: "";
    position: absolute;
    top: 0;
    left: 65px;
}

.comments:before {
    width: 3px;
    top: -20px;
    bottom: -20px;
    background: rgba(0,0,0,0.1);
}

.comment:before {
    width: 9px;
    height: 9px;
    border: 3px solid #fff;
    border-radius: 100px;
    margin: 16px 0 0 -6px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.2), inset 0 1px 1px rgba(0,0,0,0.1);
    background: #ccc;
}

.comment:hover:before {
    background: orange;
}

.comment .text:before {
    top: 18px;
    left: 78px;
    width: 9px;
    height: 9px;
    border-width: 0 0 1px 1px;
    border-style: solid;
    border-color: #e5e5e5;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
}

.hank-comment-number {
  cursor: pointer;
}

.hank-comment-click-span {
  cursor: pointer;
}

.hank-like-number {
    cursor: pointer;
}

</style>

