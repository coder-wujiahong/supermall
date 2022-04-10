<template>
  <div class="login-modal" :class="{ 'at-top': modalAtTop }">
    <div class="login-avatar"><van-icon name="user-circle-o" size="60" /></div>
    <div class="modal-head">
      <div
        class="login-choice"
        :class="{ active: isShowLogin }"
        @click="clickLogin"
      >
        登录
      </div>
      <div class="hengXian"></div>
      <div
        class="register-choice"
        :class="{ active: !isShowLogin }"
        @click="clickRegister"
      >
        注册
      </div>
    </div>
    <!-- 两个相同组件的不同定制，为了不会复用 -->
    <modal-body :isShowLogin="isShowLogin" v-show="isShowLogin"></modal-body>
    <!-- 子组件跳到登录框时，父组件靠监听自定义事件响应标题变化 -->
    <modal-body
      :isShowLogin="isShowLogin"
      v-show="!isShowLogin"
      @show-changed="changeShow"
    ></modal-body>
  </div>
</template>

<script>
	import ModalBody from "./ModalBody.vue";
	export default {
	name: "LoginModal",
	data() {
		return {
		isShowLogin: false,
		pathCount: 0,
		};
	},
	components: {
		ModalBody,
	},
	props: {
		modalAtTop: {
		type: Boolean,
		default() {
			return false;
		},
		},
	},
	methods: {
		clickLogin() {
		this.isShowLogin = true;
		},
		clickRegister() {
		this.isShowLogin = false;
		},
		changeShow(isShow) {
		this.isShowLogin = isShow;
		},
	},
	computed: {},
	};
</script>

<style scoped>
	.login-modal {
		margin: 7% auto;
	}
	/* 登录头像 */
	.login-avatar {
		width: 100%;
		text-align: center;
	}
	.at-top {
		margin: 5% auto !important;
	}
	.modal-head {
		margin: 5% auto;
		width: 60%;
		display: flex;
		justify-content: space-around;

	}
	.login-choice,
	.register-choice {
		width: 43px;
		height: 28px;
		text-align: center;
		font-size: 18px;
		font-weight: 700;
	}
	.hengXian {
		width: 1px;
		height: 20px;
		background: #000000;
	}
	.active {
		color: var(--color-tint);
		border-bottom: 3px solid var(--color-tint);
	}
</style>
