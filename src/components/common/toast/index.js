// 后来用这个封装的 toast 有莫名bug，已弃用，改用 vantUI 组件库的 toast
// 导入.vue组件，导出obj函数，方便我们直接以函数的方式来调用组件Toast.vue

import { createApp } from 'vue'
import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
	// Vue.extend(Toast)
	// document.body.appendChild(Toast.$el)
	// appendChild不支持这样写,得用下面的写法
	
	// vue2
	// 1.创建组件构造器
	// const toastContrustor = Vue.extend(Toast)
	
	// 2.new方式，根据组件构造器，创建一个组件对象
	// const toast = new toastContrustor()
	
	// 3.将组件dom，手动挂载到div元素上
	// toast.$mount(document.createElement('div'))
	
	// 4.toast.$el对应的就是div
	// document.body.appendChild(toast.$el)
	// Vue.prototype.$toast = toast
	
	// vue3
	const toast = createApp(Toast).mount(document.createElement('div'));
	document.body.appendChild(toast.$el);
	Vue.config.globalProperties.$toast = toast;
}

export default obj
