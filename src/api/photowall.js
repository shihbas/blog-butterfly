import request from '@/utils/request'

export function fetchPhotoWallList(code) {
    // 获取图片墙列表

    return request({
        url: '/yuehu/photowall/api/photo_wall_list/',
        method: 'get'
    })
}