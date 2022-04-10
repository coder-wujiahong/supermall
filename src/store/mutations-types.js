// 把mutations里的方法名和commit里的事件都抽取定义成常量
// 到时候要修改就统一在这修改
// 购物车相关
export const ADD_COUNTER = "add_counter";
export const ADD_TO_CART = "add_to_cart";
export const PLUS_CART_COUNT = "plus_car_count";
export const MINUS_CART_COUNT = "minus_car_count";
export const MODIFY_CART_COUNT = "modify_car_count";
export const DELETE_CHOSEN = "delete_chosen";
export const CHECKED_ITEM = "checked_item";
export const CHECKED_ALL = "checked_all";

// 登录相关
export const LOGGED_IN = "logged_in";
export const LOGGED_OUT = "logged_out";

// 地址相关
export const NEW_ADDRESS = "new_address";
export const MOD_ADDRESS = "mod_address";
export const DEL_ADDRESS = "del_address";
export const CHOOSE_ADDRESS = "choose_address";
export const RESET_ADDRESS = "reset_address";

// 路由跳转
export const ROUTE_CHANGE = "route_change";

// 屏幕适配相关
export const WINDOW_RESIZE = "window_resize";
export const HIDE_TAB_BAR = "hide_tab-bar";

// 单独购买相关
export const BUY_SINGLE_PURCHASE = "buy_single_purchase";
export const REMOVE_SINGLE_PURCHASE = "remove_single_purchase";

// 购买成功
export const COMFIRM_TRADE = "confirm_trade";
