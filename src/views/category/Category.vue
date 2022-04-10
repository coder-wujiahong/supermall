<template>
	<div>
		<nav-bar class="category-nav">
			<template v-slot:center>商品分类</template>
		</nav-bar>
		
		<div class="category">
			<!-- 左边分类导航 -->
			<scroll class="category-side">
				<category-left-bar :categoryLefts="categoryLefts" @cateLeftClick="getCatRit"/>
			</scroll>
			<!-- 右边导航的内容 -->
			<scroll class="category-content">
				<category-right-bar :categoryRights="categoryRights" />
			</scroll>
		</div>
		
		
	</div>
</template>

<script>
	import CategoryLeftBar from './childComps/CategoryLeftBar'
	import CategoryRightBar from './childComps/CategoryRightBar'
	
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import { getCategoryLefts, getCategoryRights } from 'network/category'
	
	export default {
		name: "Category",
		data() {
			return {
				categoryLefts: [],
				categoryRights: [],
				cateKey: ''
			}
		},
		components: {
			CategoryLeftBar,
			CategoryRightBar,
			NavBar,
			Scroll
		},
		
		created() {
			this.getCatLef()
			this.getCatRit()
		},
		
		methods: {
			// 网络请求：将左边导航需要的数据请求过来并保存在categoryLefts数组里
			getCatLef() {
				getCategoryLefts().then(res => {
					// console.log(res);
					this.categoryLefts = res.data.category.list
					this.cateKey = res.data.category.list[0].maitKey
					return this.cateKey 
				}).then(key => {
					this.getCatRit(key)
				})
			},
			
			// 网络请求：将右边的需要的数据请求过来并保存在categoryRights数组里
			getCatRit(key) {
				getCategoryRights(key).then(res => {
					console.log(res)
					this.categoryRights = res.data.list
					// this.$refs.scrollClick.scrollTO(0,0,500)
				})
			}
			
		}
	}
</script>

<style scoped>
	
	.category-nav {
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		width: 100%;
		z-index: 1;
	}
	
	.category {
		
	}
	
	.category-side {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	
	.category-content {
		/* height: calc(100% - 44px - 49px); */
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 100px;
		right: 0;
	}

</style>