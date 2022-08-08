import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'

const app = createApp(App);

// 引用包装的方法，全局注册vant组件
getVant(app)

app.use(store).use(router).mount('#app')
