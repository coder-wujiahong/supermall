<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" 
				class="tab-control-item" 
				:class="{active: index === tabCurrentIndex}" 
				@click="itemClick(index)" :key="item">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props: {
			titles: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				tabCurrentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				// 这里就不改了，在home.vue里为了让tabcontrol展示出吸顶的效果已经统一改了
				// this.tabCurrentIndex = index;
				// 将index信息通过tabClick传出去,用于实现good-list的跳转
				this.$emit('tabClick', index);
			}
		}
	}
</script>

<style>
	.tab-control {
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
	}
	
	.tab-control-item {
		flex: 1;
	}
	
	.tab-control-item span {
		padding: 5px;
	}
	
	.active {
		color: var(--color-high-text);
	}
	
	.active span {
		border-bottom: 3px solid var(--color-tint);
	}
	
	/* :class="{active: index === currentIndex}"
	@click="itemClick(index)"
	以上利用js中的itemClick点击函数来动态决定active是否生效(加上样式),来达到点击后字体变色的效果
	也可以直接用hover伪类样式来达到这样的效果,如下:
	.tab-control-item span:hover {
		color: var(--color-high-text);
		border-bottom: 3px solid var(--color-tint);
	}
	但是手机版的网页没有鼠标悬停,故而hover可能会没用(存疑) */
</style>
