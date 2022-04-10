/* 防抖函数，想防止某些函数调用过于频繁，增大服务器压力，可以利用防抖函数封装然它把多次调用并成一次
第一个参数是要封装的函数，第二个参数是两次调用间的最小时间间隔 */
export function debounce(func, delay) {
	// 这里的计时器是个延迟执行的函数，在这里先初始化计时器
	let timer = null;
	// 返回一个这里封装好的函数，以及传进来的任意数量的实参
	return function (...args) {
		// 如果存在计时器，证明延时调用的函数还在delay的时间间隔之内，可以并作一次调用，故清空计时器
		if (timer) clearTimeout(timer);
		// 重设计时器
		timer = setTimeout(() => {
			// 在delay时间过后调用这个函数，并把传进来的实参一一传入
			func.apply(this, args)
		}, delay)
	}
}

// 时间戳的格式处理函数
// 正则表达式作用：字符串匹配利器(难、规则太多)
export function formatDate (date, fmt) {
	// 获取年份
	// y+ ：1个或多个y
	// y* ：0个或多个y
	// y? ：0个或1个y
	
	// 2019
	// yy - 19
	// yyyy - 2019
	// y - 9
	// yyy - 019
	// 利用正则表达式匹配y年M月d日h时m分s秒，然后对它们分别进行处理
	if (/(y+)/.test(fmt)) {
		// 将RegExp.$1替换(replace)成后面一长串的结果
		// 利用getFullYear()获取年份(4位数)，并在后面添加''，使之变成字符串
		// 假如需要获取三位数，通过外面的参数传进yyy
		// 再利用substr()截取掉substr(4-3) = 1位，则成功获取到3位数的年份
		// 根据格式匹配年，取出完整年转换成字符串，然后截取（4-y个数）的长度保留为年
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		// 本来H代表24小时制，h代表12小时制，但是这里没区分
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	// 逐个处理月日时分秒
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			// 首先将他们转换为字符串
			let str = o[k] + '';
			// 格式处理，如果字符串长度为1，则保留当前字符串，如果长度不为1，则进入padLeftZero
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

// 将字符串和"00"拼接，然后截取字符串的长度，简单来说就是往前补0补够位数
// 不足两位数补足两位，比如：04:04:04
function padLeftZero (str) {
	return ('00' + str).substr(str.length);
}

// localStorage方法封装
export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

// 登录时合并游客和登录用户购物车
export function mergeArr(arr1, arr2) {
  // 合并、转成对象，用iid区分是否合并
  const arr3 = arr1.concat(arr2);
  const arr3Obj = {};
  arr3.forEach(element => {
    arr3Obj[element.iid] ? (arr3Obj[element.iid].count += element.count) : (arr3Obj[element.iid] = element);
  });
  const arrMerge = [];
  // 再把对象转回数组
  for (let key in arr3Obj) {
    arrMerge.push(arr3Obj[key]);
  }
  return arrMerge;
}

// mutations里用常数名封装一个函数复用无效，所以在这里操作，可能是不规范操作，不过没什么问题
export function syncUserInfo(state) {
  // 如果登录了，还需要对vuex和localStorage里登录用户的购物车信息进行更新
  if (state.loggedIn) {
    state.userInfo[state.loggedInUser].cartList = state.cartList;
    setItem(state.loggedInUser, state.userInfo[state.loggedInUser]);
  }
}
