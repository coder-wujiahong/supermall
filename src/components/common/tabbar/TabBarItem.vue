<!-- 底部导航栏列表 -->
<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
		<div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				// 默认字体颜色为绿色，封装完后可以实现在App.vue里面改颜色: activeColor="deeppink"
				default: 'green'
			}
		},
		data() {
			return {
				// 这样的话是写死的，写成下面computed计算属性则是动态的
				// isActive: false
			}
		},
		computed: {
			isActive() {
				// /home -> item1(/home) = true
				// /home -> item1(/category) = false
				// /home -> item1(/home) = false
				// /home -> item1(/home) = false
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods: {
			itemClick() {
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;	
		height: 49px;
		font-size: 14px;
	}
	
	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
	}
	
	/* 这样写颜色也是写死的,要封装得颜色样式也能在App.vue里面改得动 */
	/* .active {
		color: #FF0000;
	} */
</style>
