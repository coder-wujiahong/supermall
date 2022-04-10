<template>
	<div id="shop-item">
		<div class="item-selector">
			<slot name="left">
				<check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
			</slot>
		</div>
		
		<div class="item-img" @click="itemClick">
			<img :src="product.image" alt="商品图片">
		</div>
		
		<div class="item-info">
		  <div class="item-title" @click="itemClick">{{ product.title }}</div>
		  <div class="item-desc" @click="itemClick">{{ product.desc }}</div>
		  <div class="info-bottom">
		    <div class="item-price left">¥{{ product.price }}</div>
		    <div class="item-count right">
		      <slot name="right">
		        <button @click="minusCartCount">－</button>
							<span class="item-num" @click="showModifier">&nbsp;{{ product.count }}
		          <input ref="modifier" type="input" v-show="isModifying"/></span>
		        <button @click="plusCartCount">＋</button>
		      </slot>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'

	import { mapActions, mapState } from 'vuex'
	
	import { CHECKED_ITEM } from '@/store/mutations-types'

	export default {
		name: "CartListItem",
		data() {
			return {
				isModifying: false,
				isFirstBind: true
			};
		},
		components: {
			CheckButton
		},
		props: {
			product: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods: {
			...mapActions({
				plus: "plusCartCount",
				minus: "minusCartCount",
				modify: "modifyCartCount"
			}),
			checkClick() {
				// this.product.checked = !this.product.checked
				this.$store.commit(CHECKED_ITEM, this.product);
			},
			// 修改购物车内商品数量的一系列方法
			plusCartCount() {
				this.plus(this.product).then(res => {
					// this.$toast.show(res, 1000);
					this.$toast(res, 1000);
				});
			},
			minusCartCount() {
				if (this.product.count <= 1) {
					// this.$toast.show("最少购买一件哦！", 1000);
					this.$toast("最少购买一件哦！");
					return;
				} 
				this.minus(this.product);
			},
			showModifier() {
				this.isModifying = true;
				// 不nextTick会在showModifier执行完毕后才修改isModifying，为时已晚
				this.$nextTick(this.modifyCartCount);
			},
			modifyCartCount() {
				let modifier = this.$refs.modifier;
				modifier.focus();
				modifier.value = this.product.count;
				// 只需要在第一次点击绑定这个事件
				if (this.isFirstBind) {
					modifier.addEventListener("blur", () => {
						let value = parseInt(modifier.value);
						// 无效修改不映射，返回前要隐藏input
						if (value.isNaN || value === this.product.count) {
							this.isModifying = false;
							return;
						} else if (value >= 0) {
							this.modify({
								product: this.product,
								value
							}).then(res => {
								// this.$toast.show(res);
								this.$toast(res);
							});
						}
						this.isModifying = false;
					});
					this.isFirstBind = false;
				}
			},
			itemClick() {
				this.$router.push('/detail/' + this.product.iid);
			}
		},
		computed: {
		  ...mapState({ isSingle: "handlingSinglePurchase" })
		}
	}
</script>

<style scoped>
	/* 注意这里用的是id不是class,别写成“.” */
	#shop-item {
		width: 100%;
		/* 使用弹性布局后,item-selector,item-img,和item-info横向排列 */
		display: flex;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}

	.item-selector {
		width: 20px;
		display: flex;
		/* 水平位置 */
		justify-content: flex-start;
		/* 垂直位置 */
		align-items: center;
	}

	.item-title,
	.item-desc {
		/* 隐藏文本超出部分 */
		overflow: hidden;
		/* 文本不换行 */
		white-space: nowrap;
		/* 文本溢出时显示省略号 */
		text-overflow: ellipsis;
	}

	.item-img {
		padding: 5px;
	}

	.item-img img {
		width: 80px;
		height: 100px;
		border-radius: 5px;
	}

	.item-info {
		font-size: 17px;
		color: #333;
		padding: 5px 10px;
		overflow: hidden;
		/* 为下面info-bottom的绝对定位做准备,父元素得先相对定位 */
		position: relative;
	}

	.item-info .item-desc {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
	}

	.info-bottom {
		margin-top: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}

	.info-bottom .item-price {
		color: orangered;
	}
</style>
