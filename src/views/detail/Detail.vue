<!-- 商品详情页 -->
<template>
	<div id="detail">
		<!-- 商品标题栏 -->
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

		<!-- 中间可滚动区域 -->
		<scroll class="content" ref="scrollClick" @scroll="contentScroll" :probeType="3">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<!-- 商品详情图片 -->
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
			<detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods="recommends" ref="recommend"></goods-list>
		</scroll>

		<!-- 底部加入购物车栏 -->
		<detail-bottom-bar @addToCart="addToCart" @buyClick="handleBuyClick"/>
		<!-- 置顶按钮 -->
		<!-- backClick混入方法在src/common/mixin.js里找 -->
		<back-top @click.native="backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import {
		getDetail,
		getRecommend,
		Goods,
		Shop,
		GoodsParam
	} from 'network/detail'
	
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	import Scroll from 'components/common/scroll/Scroll'
	import Toast from 'components/common/toast/Toast'	
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backTop/BackTop'

	import { debounce } from 'common/utils'
	import { itemListenerMixin, backTopMixin } from 'common/mixin'
	
	// 和mapGetters用法相同，可以把actions里的东西映射到methods里面
	import { mapActions, mapState } from 'vuex'
	import { BUY_SINGLE_PURCHASE } from "@/store/mutations-types"
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			Toast,
			GoodsList,
			BackTop
		},
		// 混入写法，将公共方法抽离放到mixin里
		mixins: [itemListenerMixin, backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0,
				message: '',
				show: false
			}
		},
		computed: {
			...mapState(["loggedIn"])
		},
		created() {
			// 保存传入的iid
			this.iid = this.$route.params.iid;
			// 根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res);
				const data = res.result;
				// 获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages;
				// 获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				// 获取商家数据
				this.shop = new Shop(data.shopInfo);
				// 获取商品的详情数据
				this.detailInfo = data.detailInfo;
				// 获取参数页的数据
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
				// 获取评论数据
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0]
				}
			})
			// 请求推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})

			// 动态获取滚动高度的值，并给this.getThemeTopY赋值的操作进行防抖，提高性能
			this.getThemeTopY = debounce(() => {
				this.themeTopYs = [];
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				// this.themeTopYs.push(Number.MAX_VALUE);
				// console.log(this.themeTopYs);
			})
		},
		methods: {
			...mapActions({
				add: "addCart"
			}),
			
			imageLoad() {
				// this.$refs.scrollClick.refresh()
				this.newRefresh();
				this.getThemeTopY();
			},

			// 点击标题滚动到对应位置,加44是因为标题NavBar不在滚动里脱标了，200是执行时间：毫秒
			titleClick(index) {
				this.$refs.scrollClick.scrollTO(0, -this.themeTopYs[index] + 44, 200)
			},

			// 滚动位置显示对应标题
			contentScroll(position) {
				// 查看这里是否能获取到滚动的参数
				const positionY = -position.y + 44;
				let length = this.themeTopYs.length;
				for (let i = 0; i < length; i++) {
					if (this.currentIndex !== i &&
						((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
							(i === length - 1 && positionY >= this.themeTopYs[i]))) {
						this.currentIndex = i;
						// 将当前获得的参数赋值给DetailNavBar.vue并改变其参数，进而改变标题
						this.$refs.nav.currentIndex = this.currentIndex;
					}
				}
				// 当滚动位置大于1000时才显示出来,listenShowBackTop混入方法在src/common/mixin.js里找
				this.listenShowBackTop(position);
			},

			// 加入购物车
			addToCart(count) {
				// 1.获取购物车需要展示的信息
				const product = {};
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				// iid用来区分商品，给每个商品一个标识符
				product.iid = this.iid;
				product.count = count;
				// 2.将商品添加到购物车里面
				/* 重构mutations后，这里分发到actions，再由vuex内部commit到mutations里
				现在actions里返回了promise,这里可以直接then了
				因为添加了mapactions，这里可以直接this.add了 */
				this.add(product).then(res => {
					// this.$toast.show(res, 1500);
					this.$toast(res, 1500);
				});
			},
			// 单独购买
			handleBuyClick() {
			  if (this.loggedIn) {
			    const product = {};
			    product.image = this.topImages[0];
			    product.title = this.goods.title;
			    product.desc = this.goods.desc;
			    product.price = this.goods.realPrice;
			    product.iid = this.iid;
			    product.count = 1;
			    product.checked = true;
			    this.$store.commit(BUY_SINGLE_PURCHASE, product);
			    this.$router.push("/trade");
			  } else {
			    this.$router.push("/login");
			  }
			}
		},
		destroyed() {
			// 在离开页面时解除绑定这个防抖函数的监听
			this.$bus.off('itemImgLoad', itemImgListener)
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}

	.content {
		/* 减49是为了将scroll再提高一点，而使得底部工具栏不再遮住一部分推荐的数据 */
		/* calc(100% - 44px - 49px);这种写法行不通 */
		height: calc(100% - 93px);
	}
</style>
