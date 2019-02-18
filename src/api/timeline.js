import request from '@/utils/request'

export function fetchTimeLine() {
    // 获取时间线
    return request({
        url: '/yuehu/timeline/api/timeline_list/',
        method: 'get'
    })
}