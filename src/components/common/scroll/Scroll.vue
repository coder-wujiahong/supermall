<template>
	<!-- ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个数组对象 -->
	<!-- ref如果是绑定在普通元素(div)中，那么通过this.$refs.refname获取到的是一个组件对象 -->
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import ObserveDOM from '@better-scroll/observe-dom'
	BScroll.use(ObserveDOM)
	
	export default {
		name: "Scroll",
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			// document.querySelector不一定能拿到上面的'wrapper',可能会拿到别的页面的
			// this.scroll = new BScroll(document.querySelector('.wrapper'))
			// 所以可以通过ref来拿，而不要通过class中的wraper中来拿
			// 1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				observeDOM: true,
				click: true,
				// 最好不要在这里写死probeType的值，因为有些页面需要监听页面的滚动，有些不用
				// probeType: 3
				// 所以在props里写个默认的然后根据不同页面的需求来做
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			
			// 2.实时监听滚动的位置
			// probeType===2:在屏幕滑动的过程中实时的派发 scroll 事件
			// probeType===3:不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position) => {
					// 并将自定义事件的参数position发出去
					this.$emit('scroll', position);
				})
			}
			
			// 3.监听上拉加载更多事件
			if (this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp')
				})
			}
			
		},
		methods: {
			// 用来跟Home.vue中的backClick方法产生联动，拿到滚动的位置
			// time=300是默认执行时间，防止滚动过快
			scrollTO(x, y, time = 300) {
				this.scroll && this.scroll.scrollTo(x, y, time);
			},
			
			// 结束上拉函数,用来开启下次上拉方法的前提
			finishPullUp() {
				this.scroll.finishPullUp();
			},
			
			// 解决GoodsListItem滚动的bug
			refresh() {
				this.scroll && this.scroll.refresh();
			},
			
			// 获取滚动高度Y
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style>
</style>
