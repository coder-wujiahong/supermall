	// 这个文件用于存放不同vue里的重复方法，到时候直接在vue文件里导入就会自动生效
import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
import { WINDOW_RESIZE, HIDE_TAB_BAR } from '@/store/mutations-types'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			newRefresh: null
		}
	},
	mounted() {
		this.newRefresh = debounce(this.$refs.scrollClick.refresh, 50)
		// 对监听的事件进行保存
		this.itemImgListener = () => {
			this.newRefresh()
		}
		// 监听item图片加载完成
		this.$bus.on('itemImageLoad', this.itemImgListener)
	}
}

// 滚动置顶
// 由于主页和详情页里都需要BackTop，所以这里也整个抽取
export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		// Detail.vue里直接放methods里的就能直接抽过来
		// 点击置顶按钮，回到顶部效果
		backClick() {
			this.$refs.scrollClick.scrollTO(0, 0, 300)
		},
		// contentScroll里的代码不能直接抽过来,但可以新建个listenShowBackTop方法来引用
		// 当滚动位置大于1000时才显示出来
		listenShowBackTop(position) {
			this.isShowBackTop = -position.y > 1000
		}
	}
}

export const tabControlMixin = {
  data() {
    return {
      currentTab: "pop"
    };
  },
  methods: {
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
          break;
      }
    }
  }
}

// 让底部栏或按键适时隐藏的混入
export const resetResizeMixin = {
  data() {
    return {
      initialHeight: outerHeight,
      isCompShow: true
    };
  },
  methods: {
    resetResize(type) {
      window.onresize = () => {
        return (() => {
          this.isCompShow = this.initialHeight === outerHeight;
          // 购物车界面是否显示maintabbar的判断
          if (this.buttonName !== undefined) {
            this.$store.commit(HIDE_TAB_BAR, !this.isCompShow);
          }
          /*  resize后，由于地址栏的信息是v-bind绑定而不是v-model（使用v-model会引起未保存就修改地址的bug），在resize后填写的信息会全部消息，所以这里在手机输入法弹下去之前保存 */
          if (type === "addr") {
            if (!this.isCompShow) {
              this.saveAddrCache();
            }
          }
        })();
      };
      this.$store.commit(WINDOW_RESIZE, type);
    }
  }
}

export const deepCopyMixin = {
  methods: {
    deepCopy(target, source) {
      //数组和对象都可以for in遍历
      for (const key in source) {
        //数组和对象需要单独处理，其他直接拷贝
        if ( Object.prototype.toString.call(source[key]).slice(8, -1) === "Array" ) {
          target[key] = [];
          deepCopy(target[key], source[key]);
        } else if ( Object.prototype.toString.call(source[key]).slice(8, -1) === "Object" ) {
          target[key] = {};
          deepCopy(target[key], source[key]);
        } else {
          // 不直接赋值，做vue的响应式修改
          // this.$set(target, [key], source[key]);
          target[key] = source[key]
        }
      }
    }
  }
}
