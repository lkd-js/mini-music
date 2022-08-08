import axios from "axios";

let service = axios.create({
    baseURL: 'https://netease-cloud-music-eezh82qxi-lkd-js.vercel.app/',
    timeout: 3000
})

export default service