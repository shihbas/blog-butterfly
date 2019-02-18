import request from '@/utils/request'

export function fetchIndexArticleList(page) {
    // 获取首页文章列表
    const query = {
        page: page,
        "limit": 15
    }
    return request({
        url: '/yuehu/article/api/index_article_list/',
        method: 'get',
        params: query
    })
}

export function fetchIndexHotArticleList(page) {
  // 获取首页火热文章列表
  return request({
    url: '/yuehu/article/api/index_article_hot_list/',
    method: 'get'
  })
}

export function fetchIndexTopTagList() {
    // 获取首页顶级标签列
    return request({
        url: '/yuehu/article/api/index_article_tag_list/',
        method: 'get'
    })
}

export function fetchIndexSlideshowList() {
    // 获取首页顶级标签列
    return request({
        url: '/yuehu/banner/api/slice_show_list/',
        method: 'get'
    })
}
