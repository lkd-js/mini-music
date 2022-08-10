// 管理home页面axios操作
import service from "..";

// 获取轮播图数据
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}
// 获取推荐歌单
export function getMusicListHome() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}