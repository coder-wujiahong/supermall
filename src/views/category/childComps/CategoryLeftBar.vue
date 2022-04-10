<template>
	<div class="side-tabbar">
		<div v-for="(item, index) in categoryLefts"
					class="tabbar-item"
					:class="{active:currentIndex===index}"
					@click="cateLeftClick(index, item)"
					:key="index">
			{{item.title}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CategoryLeftBar',
		props: {
			categoryLefts: {
				type: Array,
				default() {
					return []
				}
			}
		},
		
		data() {
			return {
				currentIndex: 0,
				maitKey: ''
			}
		},
		
		methods: {
			// 点击左边导航切换并且记录切换数据的key
			cateLeftClick(index, item) {
				this.currentIndex = index
				this.maitKey = item.maitKey
			}
		},
		
		watch: {
			maitKey() {
				this.$emit('cateLeftClick', this.maitKey)
			}
		}
	}
</script>

<style scoped>
	.side-tabbar {
		font-size: 14px;
		background-color: #f6f6f6;
		width: 100px;
	}
	
	.tabbar-item {
		text-align: center;
		line-height: 50px;
		/* box-shadow: 0 1px 0px rgba(100,100,100,.1) */
	}
	
	.active {
		background: #fff;
		border-left: 4px solid var(--color-tint);
	}
</style>
