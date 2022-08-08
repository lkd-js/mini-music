// 管理全局axios操作
import axios from "axios";

// 设置api地址
let service = axios.create({
    baseURL: 'https://netease-cloud-music-eezh82qxi-lkd-js.vercel.app/',
    timeout: 3000
})

export default service