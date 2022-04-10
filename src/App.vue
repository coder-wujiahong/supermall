<template>
	<div id="app">
		<!-- 
		<keep-alive>
			<router-view/>
		</keep-alive> -->
		<!-- 通过 router-view 使用路由，实现页面跳转 -->
		<router-view v-slot="{ Component }">
			<keep-alive exclude="Detail">
				<component :is="Component" />
			</keep-alive>
		</router-view>

		<main-tab-bar />
		<icon></icon>
		<svg-icon></svg-icon>
	</div>
</template>

<script>
	import MainTabBar from 'components/content/mainTabBar/MainTabBar'
	// 为了能在profile中使用svg引入的两个vue
	import Icon from "components/content/Icon/Icon";
	import SvgIcon from "components/content/Icon/Svg";
	export default {
		name: 'App',
		components: {
			MainTabBar
		}
	}
</script>

<style>
	/* 这里导入base，然后base里导入normalize
	base主要存放一些自己定的基本样式，normalize是github上下载的统一多个浏览器样式风格的css文件 */
	@import "assets/css/base.css";
	@import "assets/iconfont/iconfont.css";
	#app {
	  height: 100%;
	}
</style>
