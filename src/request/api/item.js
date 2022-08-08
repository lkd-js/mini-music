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
        url: `/playlist/track/all?id=${id}&limit=20`
    })
}

// 获取歌词
export function getMusicText(id) {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${id}&limit=20`
    })
}