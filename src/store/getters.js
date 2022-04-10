export default {
	// 购物车列表数
	cartLength(state) {
		console.log(state)
		return state.cartList.length;
	},
	cartList(state) {
		console.log(state.cartList)
		return state.cartList;
	},
	// 选中的商品
	cartChecked(state, getters) {
	  return getters.cartList.filter(item => item.checked);
	},
	checkedCount(state, getters) {
	  return getters.cartChecked.length;
	},
	// 购物车选中商品的总件数
	cartCount(state, getters) {
	  return getters.cartChecked.reduce((preValue, item) => {
	    return preValue + item.count;
	  }, 0);
	},
	// 合计价格
	cartPrice(state, getters) {
	  return getters.cartChecked
	    .reduce((preValue, item) => {
	      return preValue + item.price * item.count;
	    }, 0)
	    .toFixed(2);
	},
	// 是否已经全选
	cartCheckedAll(state, getters) {
	  // 空车不全选
	  if (!getters.cartLength) return false;
	  return getters.checkedCount === getters.cartLength;
	},
	// 用户地址
	userAddresses(state) {
	  let addresses;
	  if (!state.loggedInUser) {
	    addresses = [];
	  } else {
	    addresses = state.userInfo[state.loggedInUser].addresses;
	  }
	  return addresses;
	},
	// 单独购买时的底部栏数据
	singleBottomData(state, getters) {
	  const singlePurchase = state.singlePurchase;
	  const bottomData = {
	    totalPrice: (singlePurchase.price * singlePurchase.count).toFixed(2) + "",
	    count: singlePurchase.count
	  };
	  return bottomData;
	},
	// 历史订单
	historyList(state) {
	  return state.userInfo[state.loggedInUser].tradedList;
	}
}
