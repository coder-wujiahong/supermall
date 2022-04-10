import Vue from 'vue'

// Vue2写法
// import Router from 'vue-router'
// Vue3、4写法
import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

const Login = () => import('views/login/Login')
const Address = () => import('views/address/Address')
const NewAddress = () => import('views/address/childComps/NewAddress')
const ModifyAddress = () => import('views/address/childComps/ModifyAddress')
const Trade = () => import('views/trade/Trade')
const HistoryList = () => import('views/historyList/HistoryList')
const Setting = () => import('views/setting/Setting')

import { getItem } from "common/utils";
// Vue2
// 1.安装插件
// Vue.use(Router)

// 2.创建Router
// 注意这里routes不要写成routers,多了一个"r"会运行不了
const routes = [
	{ path: "", redirect: "/home" },
	{ path: "/home", component: Home },
	{ path: "/category", component: Category },
	{ path: "/cart", component: Cart },
	{ path: "/profile", component: Profile },
	//传参数的方式别忘了，:加组件里有的data
	{ path: "/detail/:iid", component: Detail },
	{ path: "/login", component: Login },
	{ path: "/setting", component: Setting },
	// 地址页
	{
	  path: "/address/",
	  component: Address,
	  // 函数连续解构写法
	  props({ query: { type } }) {
	    return { type };
	  },
	  children: [
	    { path: "newAddr", component: NewAddress },
	    { path: "modAddr/:aid", props: true, component: ModifyAddress }
	  ]
	},
	
	// 交易页
	{
	  path: "/trade",
	  component: Trade,
	  props({ query: { from } }) {
	    return { from };
	  }
	},
	
	// 历史订单页
	{
	  path: "/historyList",
	  component: HistoryList
	}
]

// Vue3
const router = createRouter({
	routes,
	history:createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  const loggedInUser = getItem("loggedInUser");

  // 登录页面守卫
  if (to.path === "/login") {
    // 去登录页，未登录则放行
    if (!loggedInUser) {
      next();
    } else if (from.path !== "/cart" && from.path !== "/profile") {
      // 键入地址的回主页
      next("/home");
    } else if (from.path === "/profile") {
      next("/address");
    } else {
      next("/trade");
    }
  }

  // 地址页面守卫
  else if (to.path.indexOf("address") !== -1) {
    // 去地址页，未登录回主页
    if (!loggedInUser) {
      next("/home");
    } else if (to.path.indexOf("modAddr") !== -1) {
      // 登录则验证地址id是否合法
      const idPattern = /modAddr\/(\d*)/;
      // 正则捕获aid，只会获取正整数
      let aid = idPattern.exec(to.path)[1];
      // 排除第一位不是数字（负数或者乱输）
      if (aid === "") return;
      aid *= 1;
      const userInfo = getItem(loggedInUser);
      if (aid < userInfo.addresses.length) {
        next();
      }
    } else {
      next();
    }
  }

  // 交易页面守卫
  else if (to.path === "/trade") {
    if (!loggedInUser) {
      next("/home");
    } else {
      next();
    }
  }

  // 其他情况放行
  else {
    next();
  }
	
})

// 3.导出路由
export default router
