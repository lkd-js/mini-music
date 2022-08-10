// 管理item页面axios操作
import service from "..";
// 获取推荐歌单详情
export function getItemList(id) {
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${id}`
    })
}

// 获取歌曲列表
export function getMusicList(id) {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${id}`
    })
}

// 获取歌词
export function getMusicLyr(id) {
    return service({
        method: 'GET',
        url: `/lyric?id=${id}`
    })
}