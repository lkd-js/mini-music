// 发送axios请求，并将数据放在session中
import { getSearchHot, getSearchRes } from '@/request/api/search';
import { getMusicListHome, getBanner } from '@/request/api/home' // 
import { getItemList, getMusicList } from "@/request/api/item";//

const getItemListA = async (id) => {
    let playlist, isUpdate;
    if (!sessionStorage.getItem("list" + id)) {
        let res = await getItemList(id);
        console.log("获取表单res如下---↓");
        console.log(res);
        playlist = res.data.playlist;
        isUpdate = true;
        sessionStorage.setItem("list" + id, JSON.stringify(playlist));
    } else {
        console.log("从session获取表单中");
        playlist = JSON.parse(sessionStorage.getItem("list" + id));
        isUpdate = true;
    }
    return { playlist, isUpdate }
};
const getMusicListHomeA = async () => {
    let res, list;
    if (!sessionStorage.getItem("musicListData")) {
        res = await getMusicListHome();
        console.log("获取歌单图片集res如下---↓");
        console.log(res);
        list = res.data.result;
        sessionStorage.setItem(
            "musicListData",
            JSON.stringify(list)
        );
    } else {
        console.log("从session获取歌单图片集中");
        list = JSON.parse(sessionStorage.getItem("musicListData"));
    }
    return list
};
const getBannerA = async () => {
    let res, images;
    if (!sessionStorage.getItem("bannerImg")) {
        res = await getBanner();
        console.log("获取banner的res如下---↓");
        console.log(res);
        images = res.data.banners;
        sessionStorage.setItem("bannerImg", JSON.stringify(images));
    } else {
        console.log("从session获取banner中");
        images = JSON.parse(sessionStorage.getItem("bannerImg"));
    }
    return images
};
const getMusicListA = async (id) => {
    let musiclist;
    if (!sessionStorage.getItem("music" + id)) {
        let res = await getMusicList(id);
        console.log("获取歌单res如下---↓");
        console.log(res);
        musiclist = res.data.songs;
        sessionStorage.setItem("music" + id, JSON.stringify(musiclist));
    } else {
        console.log("从session获取歌单中");
        musiclist = JSON.parse(sessionStorage.getItem("music" + id));
    }
    return musiclist
};
const getHotListA = async () => {
    let res, hots;
    if (!sessionStorage.getItem("hots")) {
        res = await getSearchHot();
        console.log("获取hot-list的res如下---↓");
        console.log(res);
        hots = res.data.data;
        sessionStorage.setItem("hots", JSON.stringify(hots));
    } else {
        console.log("从session获取hot-list中");
        hots = JSON.parse(sessionStorage.getItem("hots"));
    }
    const hotlist = []
    hots.forEach(v => {
        hotlist.push(v.searchWord)
    })
    return hotlist
};
const getSearchA = async (str) => {
    let res = await getSearchRes(str);
    console.log("获取search-list的res如下---↓");
    console.log(res);
    if (res.data.code == 400) {
        return []
    } else {
        let searchSongList = res.data.result.songs
        return searchSongList
    }
};

export { getItemListA, getMusicListHomeA, getBannerA, getMusicListA, getHotListA, getSearchA }