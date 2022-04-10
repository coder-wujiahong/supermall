<template>
	<swiper>
		<swiper-item v-for="item in banners" :key="item">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	// 写swiper.js的好处
	// import Swiper from 'components/common/swiper/Swiper'
	// import SwiperItem from 'components/common/swiper/SwiperItem'
	import {Swiper, SwiperItem} from 'components/common/swiper'
	
	export default {
		name: "HomeSwiper",
		props: {
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: false
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imageLoad() {
				// 发送事件重复4次的原因：上面的轮播图有4张，会遍历4遍，所以imageLoad()也会遍历4遍
				// 而只需要imageLoad()发送事件执行一次，获得一次轮播图图片高度的值，所以可以利用if函数
				// 利用!this.isLoad值为真来使得if函数执行第一次，然后isLoad的默认值被改为true,
				// 第二次则!this.isLoad值为false，不执行if函数，使得发送事件只执行一次，不会重复执行4次
				if (!this.isLoad) {
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>

<style>
</style>
