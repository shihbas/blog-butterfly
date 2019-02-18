import axios from 'axios'

const service = axios.create({
  timeout: 2000
})

// 展示打点 t type p page a active 上一页是哪里
export function showDot(toPageTag, fromPageTag) {
    service.get(`/v.gif?t=page&p=${toPageTag}&a=${fromPageTag}`)
}

// 点击打点 t type p page a active 点击的哪里
export function clickDot(pageTag, clickTag) {
    service.get(`/v.gif?t=click&p=${pageTag}&a=${clickTag}`)
}
