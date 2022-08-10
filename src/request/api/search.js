import service from "..";

// 获取s搜索数据
export function getSearchRes(str) {
    return service({
        method: 'GET',
        url: `/cloudsearch?keywords=${str}`
    })
}

// 获取s搜索数据
export function getSearchHot() {
    return service({
        method: 'GET',
        url: '/search/hot/detail'
    })
}