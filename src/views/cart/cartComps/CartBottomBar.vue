<template>
	<div class="bottom-bar">
		<div class="check-content">
			<slot name="left">
				<check-button :is-checked="cartCheckedAll" class="check-button" @click.native="checkClick"/>
				<span>全选</span>
			</slot>
		</div>
		
		<slot name="center">
			<div class="price">合计：{{cartPrice}}</div>
		</slot>
			
		<slot name="right">
			<div class="go-buy" @click="calcClick" v-show="!isManaging">去结算({{checkedCount}})</div>
		</slot>
		
		<span class="go-bye" @click="checkForDelete" v-show="isManaging">移除</span>
		
		<div class="check-for-delete" v-show="isChecking">
		  <div>
		    <span>确认要删除这些商品吗？</span>
					<button class="btn_left" @click="isChecking = !isChecking">
						取消
					</button>
					<button class="btn_right" @click="deleteItems">确定</button>
		  </div>
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import { DELETE_CHOSEN, CHECKED_ALL } from "@/store/mutations-types"
	
	import { mapGetters, mapState } from 'vuex'
	
	export default {
		name: "CartBottomBar",
		data() {
		  return {
		    // 决定是否显示遮罩层
		    isChecking: false
		  }
		},
		components: {
			CheckButton
		},
		props: {
		  isManaging: {
		    type: Boolean,
		    default() {
		      return false;
		    }
		  }
		},
		computed: {
			...mapGetters([
			  "cartLength",
			  "cartList",
			  "cartChecked",
			  "checkedCount",
			  "cartPrice",
			  "cartCheckedAll"
			]),
			...mapState({
			  isIn: "loggedIn"
			}),
			// totalPrice() {
			// 	return '￥' + this.cartList.filter(item => {
			// 		return item.checked
			// 	}).reduce((preValue, item) => {
			// 		return preValue + item.price * item.count
			// 	}, 0).toFixed(2)
			// },
			// checkLength() {
			// 	return this.cartList.filter(item => item.checked).length
			// },
			// isSelectAll() {
			// 	if (this.cartList.length === 0) return false
				
			// 	// 1.使用filter
			// 	// return !(this.cartList.filter(item => !item.checked).length)
				
			// 	// 2.使用find
			// 	// return !this.cartList.find(item => !item.checked)
				
			// 	// 3.普通遍历
			// 	for (let item of this.cartList) {
			// 		if (!item.checked)
			// 			return false
			// 	}
			// 	return true
			// }
		},
		methods: {
			checkClick() {
				// if(this.isSelectAll) { //全部选中
				// 	this.cartList.forEach(item => item.checked = false)
				// } else { // 部分或全部不选中
				// 	this.cartList.forEach(item => item.checked = true)
				// }
				// this.cartList.forEach(item => item.checked = !this.isSelectAll)
				
				// 为了响应式，把上面代码交给mutations更新购物车
				this.$store.commit(CHECKED_ALL, this.cartCheckedAll);
			},
			calcClick() {
			  // 需要内置转换，因为cartPrice保留了小数
			  if (this.cartPrice == 0) {
			    // this.$toast.show("请先选择要购买的商品");
					this.$toast("请先选择要购买的商品");
			  } else {
			    this.$router.push("/login").catch(err => err);
			  }
			},
			deleteItems() {
			  this.$store.commit(DELETE_CHOSEN);
			  this.isChecking = !this.isChecking;
			},
			checkForDelete() {
			  if (!this.checkedCount) {
			    // this.$toast.show("请选择要删除的商品");
					this.$toast("请选择要删除的商品");
			    return;
			  }
			  this.isChecking = !this.isChecking;
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		height: 41px;
		/* 因为商品列表过多会把汇总工具栏给挤下去,所以工具栏采用相对定位 */
		position: relative;
		background-color: #eee;
		line-height: 40px;
		display: flex;
		font-size: 14px;
	}
	
	.check-content {
		display: flex;
		align-items: center;
		padding-left: 5px;
		width: 60px;
	}
	
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	
	.price {
		margin-left: 20px;
		/* 占据check-content和calculate中间的宽度 */
		flex: 1;
	}
	
	.go-bye,
	.go-buy {
		font-size: small;
	  width: 100px;
	  background-color: red;
	  color: #FFFFFF;
	  text-align: center;
	}
	
	.check-for-delete {
	  display: block;
	  position: absolute;
		transform: translateY(-80%);
		z-index: 10;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 120vh;
		font-size: 14px;
	  background-color: rgba(0, 0, 0, 0.5);
	}
	.check-for-delete div {
	  margin: 88% auto 30%;
	  width: 80%;
	  height: 17%;
	  background-color: #FFFFFF;
		border-radius: 14px;
		display: flex;
		justify-content: center;
	}
	.check-for-delete span {
	  position: absolute;
		line-height: 30px;
		height: 30px;
		margin: 6% auto;
		color: black;
		/* 字体间距 */
		letter-spacing: 2px;
	}
	.check-for-delete button {
	  border: 1px solid red;
	  border-radius: 20px;
		text-align: center;
		width: 30%;
		height: 30px;
		line-height: 30px;
		margin-top: 25%;
	}
	.check-for-delete .btn_left {
		color: red;
		background: white;
		margin-right: 15px;
	}
	.check-for-delete .btn_right {
		color: white;
		background: red;
	}
</style>
