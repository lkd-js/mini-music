// 传入[time],转化为毫秒数
const checkTime = (arrStr) => {
    let str1 = arrStr.replace("[", "");
    let str2 = str1.replace("]", "");
    const times = str2.split(":");
    const time = Number(times[0]) * 60 * 1000 + Number(times[1] * 1000);
    return time;
};
// 传入字符串，转化为时间和歌词两个数组 msTimeArr, conArr
const layout = (str) => {
    // 根据换行符分句
    const spanArr = str.split(/[(\r\n)\r\n]+/);
    //   console.log(spanArr);
    //定义时间数组 和 歌词数组
    const timeArr = [];
    const conArr = [];
    spanArr.forEach((v) => {
        const time = v.match(/\[[\s\S]+\]/);
        if (time && time[0]) {
            timeArr.push(time[0]);
            let vt = v.replace(time[0], "");
            conArr.push(vt);
        }
    });
    // 定义毫秒时间数组
    const msTimeArr = [];
    timeArr.forEach((v, i) => {
        let mstime = checkTime(v);
        if (isNaN(mstime)) {
            conArr.splice(i, 1);
        } else {
            msTimeArr.push(mstime);
        }
    });
    return { msTimeArr, conArr };
};
export { layout }