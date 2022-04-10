<template>
	<div>
		<nav-bar>
			<template v-slot:left>
				<div class="back" @click="backClick">
					<img src="~assets/img/common/back.svg" alt="">
				</div>
			</template>
			
			<template v-slot:center>
				<div class="title">
					<div v-for="(item, index) in titles"
							class="title-item"
							:class="{active: index === currentIndex}"
							@click="titleClick(index)"
							:key="item">
						 {{item}}
					</div>
				</div>
			</template>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	export default {
		name: "DetailNavBar",
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			// 改变导航栏标题颜色
			titleClick(index) {
				this.currentIndex = index
				this.$emit('titleClick', index)
			},
			
			// 返回首页
			backClick() {
				this.$router.back()
			}
		}
	}
</script>

<style>
	.title {
		/* 让4个标题水平分布 */
		display: flex;
		font-size: 13px;
	}
	
	.title-item {
		/* 让4个标题均匀分布 */
		flex: 1;
	}
	
	.active {
		color: var(--color-high-text)
	}
	
	.back img {
		margin-top: 10px;
	}
</style>
