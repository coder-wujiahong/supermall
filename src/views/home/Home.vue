<template>
	<div id="home">
		<nav-bar class="home-nav">
			<template v-slot:center>购物街</template>
		</nav-bar>
		
		<tab-control :titles="['流行', '新款', '精选']"
								 @tabClick="tabClick" 
								 ref="tabControl_1"
								 class="tab-control"
								 v-show="isTabFixed"/>
		
		<scroll class="content" 
						ref="scrollClick" 
						:probe-type="3" 
						@scroll="contentScroll" 
						:pull-up-load="true"
						@pullingUp="loadMore">
			<!-- 轮播图 -->
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"/>
			<feature-view/>
			<tab-control :titles="['流行', '新款', '精选']"
									 @tabClick="tabClick" 
									 ref="tabControl_2"/>
			<!-- 商品列表 -->
			<goods-list :goods="showGoods"/>
		</scroll>
		
		<!-- 原生元素(div)才可以直接监听，要监听原生组件(back-top)的话需要添加“.native” -->
		<!-- 在原来v-on修饰符ppt那里有相关知识点 -->
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		
		<!-- 上拉加载更多弹窗 -->
		<toast :show="show"/>
		
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import Toast from 'components/common/toast/Toast'
	
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backTop/BackTop'
	
	import {getHomeMultidata, getHomeGoods} from 'network/home'
	import {debounce} from 'common/utils'
	import {itemListenerMixin, backTopMixin} from 'common/mixin'
	
	export default {
		name: "Home",
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			Scroll,
			Toast,
			TabControl,
			GoodsList,
			BackTop
		},
		
		// 混入写法，将公共方法抽离放到mixin里
		mixins: [itemListenerMixin, backTopMixin],
		
		data() {
			return {
				// result: null
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list: []},
					'new': {page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				currentType: 'pop',
				// isShowBackTop: false,
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0,
				show: false
			}
		},
		
		computed: {
			// 获取商品列表序号
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		
		// 回来Home.vue时调用activated()
		activated() {
			this.$refs.scrollClick.scrollTO(0, this.saveY, 0)
			this.$refs.scrollClick.refresh()
		},
		
		// 离开Home.vue时调用deactivated()，记录离开时的位置
		deactivated() {
			this.saveY = this.$refs.scrollClick.getScrollY()
			
			// 取消全局事件的监听
			this.$bus.off('itemImageLoad', this.itemImgListener)
		},
		
		// 声明周期函数created表示在首页创建的时候就调用这个网络请求
		created() {
			// 1.请求多个数据
			this.getHomeMultidata()
			
			// 2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		
		methods: {
			// 事件监听相关的方法
			
			// 流行、新款、精选之间的数据切换
			tabClick(index) {
				// 用于测量点击tabClick后是否打印出参数，以及打印出的参数是什么，为下面的case数值做铺垫
				// console.log(index);
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl_1.currentIndex = index;
				this.$refs.tabControl_2.currentIndex = index;
			},
			
			// 点击置顶按钮回到顶部
			// backClick() {
			// 	this.$refs.scrollClick.scrollTO(0,0)
			// },
			// 因详情页也要用到置顶功能，所以将上面的方法抽离出来放到src/common/mixin.js里，即：混入
			
			// 滚动屏幕到指定位置，显示和隐藏置顶按钮
			contentScroll(position) {
				// 当滚动位置大于1000时才显示出来
				// this.isShowBackTop = (-position.y) > 1000
				// 这里采用混入写法（mixin.js）
				this.listenShowBackTop(position);
				
				// 决定tabControl是否吸顶(position: fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop;
			},
			
			// 上拉加载更多方法
			loadMore() {
				// 再次调用网络请求方法来获取新的数据
				this.getHomeGoods(this.currentType);
				
				// this.$toast.show("上拉加载更多", 1500);
			},
			
			// 获取tabControl中的offsetTop
			swiperImageLoad() {
				// 所有组件都有一个属性$el：用于获取组件中的元素
				this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop;
			},
			
			// 网络请求相关的方法
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					// console.log(res);
					//将请求的数据保存到data函数的result中，则不会被垃圾回收机制回收掉
					// this.result = res;
					
					// 只请求特定的数据
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			
			// 上拉商品列表加载更多数据
			getHomeGoods(type) {
				// getHomeGoods(type, 1).then(res => {
					// console.log(res);
				// })
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					// console.log(res);
					// ...语法看结尾方法二解释
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					// 参考BScroll的基本使用,以实现下次上拉拉加载功能
					this.$refs.scrollClick.finishPullUp();
				})
			}
		}
	}
</script>

<style scoped>
	#home {
		/* 跟随下面的注释而注释 */
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	
	.home-nav {
		background-color: var(--color-tint);
		color: white;
		/* 将顶部标题栏固定在上方,不随屏幕的滚动而滚动 */
		/* 在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
		/* 上面注释掉不用是因为:
		之前home-nav会因为原生滚动而跟着下面的东西一起滚动
		而使用position:fixed后才与原页面脱标,不会被原生滚动影响
		但之后运用了better-scroll的局部滚动而不用原生滚动
		则不会影响home-nav了,所以也就不需要这个了*/
	}
	
	/* sticky:实现"流行/新歌/精选"这一行拉到顶部时停留在"购物街"的下面 */
	/* .tab-control {
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	/* 这个方案太复杂,所以用上面的
	.content {
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
	
	.tab-control {
		position: relative;
		z-index: 9;
		margin-top: -1px;
	}
	
</style>
<!-- 如何将请求到的数据(数组形式)存放到另一个数组？
eg:
let totalNums = []
const nums = [20, 11, 222]

方法一：用for循环
for (let n of nums) {
	totalNums.push(n)
}
方法二：用特殊语法'...'
totalNums.push(...nums) -->
