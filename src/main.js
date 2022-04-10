import { createApp } from 'vue'
import App from './App.vue'
// vue路由和vuex都是在main.js里导入和注册的
import router from './router'
import store from './store'
// 这个库用于解决移动端点击的300ms延迟
import FastClick from 'fastclick'
import VueLazyLoad from 'vue3-lazyload'

// 阿里巴巴矢量图标库，用来支付时展示微信、支付宝、云闪付图标用
import iconfont from "./assets/iconfont/iconfont";

// 不知道为什么这个自己封装的突然用不了，只能用第三方toast插件
// import toast from 'components/common/toast'
// 这里改用vant组件库的toast弹窗

// UI组件库
import Vant from 'vant';
import 'vant/lib/index.css';
// Popup: 底部弹出组件，Area: 省市区组件
import { Toast, ShareSheet, Popup, Area } from 'vant';

// 添加事件总线对象
// Vue2
// createApp.prototype.$Eventbus = new Vue()
// Vue3
import mitt from 'mitt'

// 创建Vue应用实例
const app = createApp(App)
// 挂载事务总线为全局属性
app.config.globalProperties.$bus = new mitt()

// 安装toast插件
app.use(Toast)

// 安装分享面板插件
app.use(ShareSheet)

// 安装弹出层
app.use(Popup)

// 安装省市区选择组件
app.use(Area)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
// 然后还要把懒加载的图片的src弄成v-lazy
// 但是这样会出现bug，即下拉加载更多以后别的标签下面会出现大量空白，直到它下面也拉到这个高度才会加载
// 而且适用v-lazy的img属性@load无法正确监听加载完成
app.use(VueLazyLoad, {
	// 占位图：在图片还没有加载出来时先显示这张图片
	loading: require('./assets/img/common/placeholder.png')
})


// Vue2
// createApp(App).mount('#app')
// Vue3
app.use(store).use(router).use(Vant).mount('#app')
// 上面定义了app后下面也要跟着引用,不然会报错
// createApp(App).use(router).mount('#app')
