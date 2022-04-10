import * as muTypes from './mutations-types'

import { syncUserInfo } from 'common/utils'
export default {
  // 用来做方法名时记得加中括号
  [muTypes.ADD_COUNTER](state, payload) {
    // payload.product.count += payload.goods.count;
		payload.count++;
    syncUserInfo(state);
  },
  [muTypes.ADD_TO_CART](state, payload) {
    // 加入购物车默认选中
    payload.checked = true;
    state.cartList.push(payload);
    syncUserInfo(state);
  },
  // 购物车的增删改
  [muTypes.PLUS_CART_COUNT](state, payload) {
    if (!state.handlingSinglePurchase) {
      payload.count++;
      if (payload.count === 1) payload.checked = true;
      syncUserInfo(state);
    } else {
      state.singlePurchase.count++;
    }
  },
  [muTypes.MINUS_CART_COUNT](state, payload) {
    if (!state.handlingSinglePurchase) {
      payload.count--;
      if (payload.count === 0) payload.checked = false;
      syncUserInfo(state);
    } else if (state.singlePurchase.count > 1) {
      state.singlePurchase.count--;
    }
  },
  [muTypes.MODIFY_CART_COUNT](state, payload) {
    // 由于都是有效修改，当前为0，则需选中，改后为0，则需反选
    if (!state.handlingSinglePurchase) {
      if (payload.product.count === 0) payload.product.checked = true;
      payload.product.count = payload.nowCount;
      if (payload.nowCount === 0) payload.product.checked = false;
      syncUserInfo(state);
    } else {
      state.singlePurchase.count = payload.nowCount === 0 ? 1 : payload.nowCount;
    }
  },
  [muTypes.DELETE_CHOSEN](state, payload) {
    state.cartList = state.cartList.filter(item => {
      return !item.checked;
    });
    syncUserInfo(state);
  },
  // 购物车的选中和全选
  [muTypes.CHECKED_ITEM](state, payload) {
    const index = state.cartList.indexOf(payload);
    state.cartList[index].checked = !payload.checked;
    syncUserInfo(state);
  },
  [muTypes.CHECKED_ALL](state, payload) {
    if (payload) {
      state.cartList.forEach(item => (item.checked = false));
    } else {
      state.cartList.forEach(item => (item.checked = true));
    }
    syncUserInfo(state);
  },

  // 登录和登出的相关状态修改
  [muTypes.LOGGED_IN](state, payload) {
    state.loggedIn = true;
    state.loggedInUser = payload.uname;
    state.userInfo[payload.uname] = payload;
    // 因为在登录时，用户购物车和游客购物车进行了合并，登录后现有购物车取用户购物车的值即可
    state.cartList = payload.cartList;
    state.tradedList = payload.tradedList;
  },
  [muTypes.LOGGED_OUT](state, payload) {
    state.loggedIn = false;
    state.loggedInUser = "";
    state.userInfo[payload].isLoggedIn = false;
    state.cartList = [];
    state.tradedList = [];
  },

  /* 保存新地址信息和修改现有地址信息的操作
  也加入了默认地址的排序首位功能和取消其他地址的默认功能 */
  [muTypes.NEW_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    // 逻辑类似于修改时勾选，还简单点
    if (payload.default) {
      addresses.unshift(payload);
      addresses.forEach((addr, id) => {
        addr.id = id;
        if (addr.default && addr.id) {
          addr.default = false;
        }
      });
    } else {
      payload.id = addresses.length;
      addresses.push(payload);
    }
  },
  [muTypes.MOD_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    // 勾选默认且勾选前不是默认
    if (payload.default && payload.id !== 0) {
      // 删除这个元素、从头插入、修改id并去除其他默认
      addresses.splice(payload.id, 1);
      addresses.unshift(payload);
      addresses.forEach((addr, id) => {
        addr.id = id;
        if (addr.default && addr.id) {
          addr.default = false;
        }
      });
    } else {
      addresses[payload.id] = payload;
    }
  },
  // 删除地址
  [muTypes.DEL_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    addresses.splice(payload.id, 1);
    // 删除之后记得刷新id
    addresses.forEach((addr, id) => {
      if (addr.id > payload.id) {
        addr.id = id;
      }
    });
  },
  [muTypes.CHOOSE_ADDRESS](state, payload) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    addresses.forEach(addr => (addr.chosen = false));
    addresses[payload].chosen = true;
  },
  [muTypes.RESET_ADDRESS](state) {
    const addresses = state.userInfo[state.loggedInUser].addresses;
    addresses.forEach(addr => (addr.chosen = false));
  },

  // 记录路由跳转次数，决定是否可以后退
  [muTypes.ROUTE_CHANGE](state, payload) {
    state.routeChangeCount++;
  },

  // 修改当前绑定的resize匿名函数自调用
  [muTypes.WINDOW_RESIZE](state, payload) {
    state.resizeType = payload;
  },
  [muTypes.HIDE_TAB_BAR](state, payload) {
    state.hideTabBar = payload;
  },

  // 购买单件物品相关
  [muTypes.BUY_SINGLE_PURCHASE](state, payload) {
    state.handlingSinglePurchase = true;
    state.singlePurchase = payload;
  },
  [muTypes.REMOVE_SINGLE_PURCHASE](state) {
    state.handlingSinglePurchase = false;
    state.singlePurchase = {};
  },

  // 购买成功操作
  [muTypes.COMFIRM_TRADE](state, payload) {
    const userInfo = state.userInfo[state.loggedInUser];
    // 本次购买的商品数组
    let tradedPurchases = [];
    // 单件购买
    if (payload) {
      tradedPurchases.push(state.singlePurchase);
      // 清除单件商品且将单件购买状态置为false
      state.handlingSinglePurchase = false;
      state.singlePurchase = {};
      // 商品从购物车数组迁移向我的订单
    } else {
      tradedPurchases = state.cartList.filter(
        item => item.checked && item.count > 0
      );
      state.cartList = state.cartList.filter(
        item => !item.checked || item.count <= 0
      );
      userInfo.cartList = state.cartList;
    }
    userInfo.tradedList.unshift(tradedPurchases);
  }
};
