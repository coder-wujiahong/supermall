<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="cart-nav">
			<template v-slot:center>购物车({{length}})</template>
			<template v-slot:right>
				<div class="btn-top-right" @click="manageCart">
					{{ buttonName[currentIndex] }}
				</div>
			</template>
		</nav-bar>
		
		<!-- 商品列表 -->
		<scroll class="wrapper" ref="scrollClick" :probetype="3">
			<cart-list :cart-list="cartlist"/>
			<van-empty description="再忙,也要记得买点什么犒赏自己~"/>
		</scroll>
		
		<!-- 底部汇总 -->
		<cart-bottom-bar :isManaging="isManaging"></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	
	import CartList from './cartComps/CartList.vue'
	import CartBottomBar from './cartComps/CartBottomBar.vue'
	
	//mapGetters是一个把getters里的函数映射到计算属性的辅助函数
	import { mapGetters } from 'vuex'
	
	import { resetResizeMixin } from "common/mixin";
	export default {
		name: "Cart",
		data() {
		  return {
		    // 记录购物车商品数量，根据这个同步与否决定scroll是否刷新
		    purchaseCount: 0,
		    buttonName: ["编辑", "完成"],
		    currentIndex: 0,
		    isManaging: false
		  };
		},
		components: {
			NavBar,
			Scroll,
			CartList,
			CartBottomBar
		},
		mixins: [resetResizeMixin],
		computed: {
			// mapgetters函数的两种用法:1.直接按原名映射过来，在参数里放数组，数组里放每个函数名的字符串就行
			// ...mapGetters(["cartLength","cart"])
			// 2.参数里放对象，然后键用作映射过来后的别名，值就是映射的函数名(注意这里键和值缺一不可)
			...mapGetters({
				length: 'cartLength',
				cartlist: "cartList"
			})
		},
		methods: {
			cartClick() {
				this.isShow = !this.isShow
			},
			manageCart() {
				this.currentIndex = (this.currentIndex + 1) % 2;
				this.isManaging = !this.isManaging;
			}
		},
		activated() {
		  	this.$refs.scrollClick.refresh();
			// 切换页面不会销毁原页面
		  	this.resetResize("cartlist");
		}
	}
</script>

<style scoped>
	.cart {
		height: 100vh;
	}
	
	.cart-nav {
		position: relative;
		background-color: var(--color-tint);
		color: #fff;
		z-index: 9;
	}
	
	.btn-top-right {
	  color: white;
		background-color: var(--color-tint);
	}
	
	.wrapper {
	  height: calc(100% - 133px);
	}
</style>
