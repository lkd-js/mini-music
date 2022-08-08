import { Swipe, SwipeItem, Button, Popup, Icon, NoticeBar } from 'vant';

let plugins = [
    Swipe, SwipeItem, Button, Popup, Icon, NoticeBar
];

export default function getVant(app) {
    plugins.forEach(item => app.use(item))
}