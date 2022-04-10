import {
	ADD_COUNTER,
	ADD_TO_CART,
	PLUS_CART_COUNT,
	MINUS_CART_COUNT,
	MODIFY_CART_COUNT
} from './mutations-types'

export default {
	addCart(context, payload) {
  		// context是肯定要的参数，但是如果要用state里的东西，还是需要加state，形如context.state
		return new Promise((resolve, reject) => {
			// 1.查找之前数组中是否有该商品
      		// find是数组方法，即查找满足参数函数条件的item，并把item返回给oldProduct
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
			if (oldProduct) { //商品数量+1
				// oldProduct.count += 1;
        		// 如果商品列表里已经有这件商品，那么数量增加，两个商品对象的数据都需要
				context.commit(ADD_COUNTER, { oldProduct, payload });
				resolve("商品数量+1");
			} else { //添加了新的商品
				payload.count = 1;
				// context.state.cartList.push(payload)
				context.commit(ADD_TO_CART, payload);
				resolve("添加了新的商品");
			}
		})
	},
	/* 直接修改商品数量前的前置处理，也要区分时购物车结算还是直接购买 */
	// 增加、减少购物车相应商品的数量
	plusCartCount(context, payload) {
		return new Promise((resolve, reject) => {
			const state = context.state;
			let product;
			if (!state.handlingSinglePurchase) {
				product = state.cartList.find(item => item.iid == payload.iid);
				if (product.count === 0 && !product.checked) {
					resolve("又为您选中这个商品啦");
				}
			} else {
				product = payload;
			}
			context.commit(PLUS_CART_COUNT, product);
		});
	},
	minusCartCount(context, payload) {
		const state = context.state;
		let product;
		if (!state.handlingSinglePurchase) {
			product = state.cartList.find(item => item.iid == payload.iid);
		} else {
			product = payload;
		}
		context.commit(MINUS_CART_COUNT, product);
	},
	// 直接修改购物车商品数量
	modifyCartCount(context, payload) {
		return new Promise((resolve, reject) => {
			const state = context.state;
			let product;
			if (!state.handlingSinglePurchase) {
				product = state.cartList.find(item => item.iid == payload.product.iid);
				if (product.count === 0 && !product.checked) {
					resolve("又为您选中这个商品啦");
				} else if (payload.value === 0 && product.checked) {
					resolve("帮您取消选中啦");
				}
			} else {
				product = payload.product;
			}
			context.commit(MODIFY_CART_COUNT, {
				product,
				nowCount: payload.value
			})
		})
	}
}
