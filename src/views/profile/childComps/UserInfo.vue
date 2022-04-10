<template>
  <!-- profile的navbar下的第一个组件：个人信息 -->
  <div id="user-info" @click="toLogin">
    <!-- 取消a标签点击跳转，不然和外层监听点击冲突会有第一次无法跳转的bug -->
    <a href="javascript:;" class="clear-fix">
      <slot name="user-icon">
        <div class="avatar left" v-if="isIn" style="background-color:black;">
          <img src="~assets/img/profile/github_icon_color.png" alt="" />
        </div>
        <svg class="avatar left" v-else style="background-color:white;">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </slot>
      <div class="login-info left">
        <span name="user-nickname" v-show="isIn">
          <div>{{ uname }}</div>
        </span>
        <div class="addr" v-show="isIn">
          <span class="iconfont icon-dizhi"> </span>
          <span class="addr-text">管理收货地址</span>
        </div>
        <div class="tip" v-show="!isIn">登录/注册</div>
      </div>
      <!-- <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
        <use
          data-v-735ff1be=""
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#arrow-right">
        </use>
      </svg> -->
    </a>
		<div class="arrow-svg">
			<van-icon name="arrow" size="30"/>
		</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserInfo",
  computed: {
    ...mapState({
      isIn: "loggedIn",
      user: "loggedInUser"
    }),
    uname() {
      return this.user;
    }
  },
  methods: {
    toLogin() {
      // 重定向跳转到Address时会报错，抛出异常即可
      this.$router.push("/login").catch(() => {});
    }
  }
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
	display: flex;
	justify-content: space-between;
}
#user-info .avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
.avatar img {
  width: 100%;
}
#user-info .arrow-svg {
	color: white;
  padding-top: 10px;
}
#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
  font-size: 18px;
}

#user-info .login-info .addr {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 300;
}
.addr .addr-text {
  margin-left: 2px;
}
.login-info .tip {
  margin-top: 16%;
}

.left {
  float: left;
}
</style>
