// 导入vant组件
import { Swipe, SwipeItem, Button, Popup, Icon, NoticeBar } from 'vant';

let plugins = [
    Swipe, SwipeItem, Button, Popup, Icon, NoticeBar
];
// 全局注册
export default function getVant(app) {
    plugins.forEach(item => app.use(item))
}