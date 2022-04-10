// vue2写法
// import Vue from 'vue'
// import Vuex from 'vuex'
// vue3写法
import { createStore } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// vue2写法
// 1.安装插件
// createApp.use(Vuex)

const state = {
	cartList: [],
	userInfo: {},
	// 方便判断登录状态和登录用户
	loggedIn: false,
	loggedInUser: "",
	routeChangeCount: 0,
	// 为了自动初始化，把type设为空让两个type都不匹配
	resizeType: "",
	hideTabBar: false,
	handlingSinglePurchase: false,
	singlePurchase: {},
	tradedList: []
}

// vue2写法
// 2.创建对象
// const store = new Vuex.store({})
// vue3写法
export default createStore({
	state,
	mutations,
	actions,
	getters
})

// vue2写法
// 3.导出store独享
// export default store
