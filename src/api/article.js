import request from '@/utils/request'

export function fetchArticleDetail(code) {
  // 获取文章详情
  const query = {
    code: code
  }
  return request({
    url: '/yuehu/article/api/get_article_detail/',
    method: 'get',
    params: query
  })
}

export function setLikeArticle(code) {
  // 设置喜欢文章
  const data = {
    article_code: code
  }
  return request({
    url: '/yuehu/article/api/article_like/',
    method: 'post',
    data
  })
}

export function cancelLikeArticle(code) {
  // 取消喜欢文章
  const query = {
    article_code: code
  }
  return request({
    url: '/yuehu/article/api/article_like/',
    method: 'delete',
    params: query
  })
}

export function fetchArticleComments(code, page) {
  // 获取文章的评论
  const query = {
    article_code: code,
    page: page
  }
  return request({
    url: '/yuehu/article/api/article_comment_list/',
    method: 'get',
    params: query
  })
}

export function addArticleComment(data) {
  // 评论文章
  return request({
    url: '/yuehu/article/api/article_comment/',
    method: 'post',
    data
  })
}

export function deleteArticleComment(query) {
  // 删除文章的评论
  return request({
    url: '/yuehu/article/api/article_comment/',
    method: 'delete',
    params: query
  })
}

export function addArticleReplyComment(data) {
  // 回复文章评论
  return request({
    url: '/yuehu/article/api/article_reply_comment/',
    method: 'post',
    data
  })
}

export function deleteArticleReplyComment(query) {
  // 删除文章的评论回复
  return request({
    url: '/yuehu/article/api/article_reply_comment/',
    method: 'delete',
    params: query
  })
}
