<template>
	<tab-bar v-show="showCondition">
		<tab-bar-item path="/home" activeColor="pink">
			<!-- Vue2 -->
			<!-- 这种具名插槽只适合低版本的Vue2，因为本项目采用Vue3，所以不兼容，得采用新写法,下面的一律都得改过来 -->
			<!-- <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt=""> -->
			<!-- <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt=""> -->
			<!-- <div slot="item-text">首页</div> -->
			
			<!-- Vue3 -->
			<template v-slot:item-icon>
				<img src="~assets/img/tabbar/home.svg" alt="">
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tabbar/home_active.svg" alt="">
			</template>
			<template v-slot:item-text>首页</template>
			
		</tab-bar-item>
		<tab-bar-item path="/category" activeColor="pink">
			<!-- <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
			<img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
			<div slot="item-text">分类</div> -->
			<template v-slot:item-icon>
				<img src="~assets/img/tabbar/category.svg" alt="">
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tabbar/category_active.svg" alt="">
			</template>
			<template v-slot:item-text>分类</template>
		</tab-bar-item>
		<tab-bar-item path="/cart" activeColor="pink">
			<!-- <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
			<img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
			<div slot="item-text">购物车</div> -->
			<template v-slot:item-icon>
				<img src="~assets/img/tabbar/shopcart.svg" alt="">
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tabbar/shopcart_active.svg" alt="">
			</template>
			<template v-slot:item-text>购物车</template>
		</tab-bar-item>
		<tab-bar-item path="/profile" activeColor="pink">
			<!-- <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
			<img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
			<div slot="item-text">我的</div> -->
			<template v-slot:item-icon>
				<img src="~assets/img/tabbar/profile.svg" alt="">
			</template>
			<template v-slot:item-icon-active>
				<img src="~assets/img/tabbar/profile_active.svg" alt="">
			</template>
			<template v-slot:item-text>我的</template>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar'
	import TabBarItem from 'components/common/tabbar/TabBarItem'
	
	import { getItem } from "common/utils";
	import { LOGGED_IN, ROUTE_CHANGE } from "@/store/mutations-types";
	import { mapState } from "vuex";

	export default {
		name: "MainTabBar",
		components: {
			TabBar,
			TabBarItem
		},
		data() {
		  return {
		    excludePaths: ["/address", "/login", "/trade", "/historyList"],
		    initialHeight: outerHeight
		  };
		},
		mounted() {
		  // 记录登录状态功能：程序启动时检查是否有未登出的用户，并看看能否获取它的信息
		  const nowUser = getItem("loggedInUser");
		  if (nowUser) {
		    const nowUserInfo = getItem(nowUser);
		    if (nowUserInfo) {
		      this.$store.commit(LOGGED_IN, nowUserInfo);
		    }
		  }
		},
		computed: {
		  ...mapState({ isHide: "hideTabBar" }),
		  showCondition() {
		    // path不包含所有excludePaths中的路径才显示
		    const flagA = this.excludePaths.every(ele => {
		      return this.$route.path.indexOf(ele) === -1;
		    });
		    return !this.isHide && flagA;
		  }
		},
		watch: {
		  $route: {
		    handler(newv, oldv) {
		      this.$store.commit(ROUTE_CHANGE);
		    }
		  }
		}
	}
</script>

<style>
</style>
