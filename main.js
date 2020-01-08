import Vue from 'vue'
import App from './App'
import http from './utils/https.js'
import status from './components/status.vue'

Vue.config.productionTip = false
// 网络请求
Vue.prototype.request = http//封装好的网络请求

// 全局注册组件 就是components文件夹下的文件
Vue.component(
   'status-ios',status
)
	

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
