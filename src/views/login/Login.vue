<template>
	<div class="login" @click="pageClick">
		<back-nav-bar class="nav-bar">
			<template v-slot:left><img src="~assets/img/common/back_black.png" alt="" class="img"></template>
			<template v-slot:center>登录/注册</template>
		</back-nav-bar>
		<login-modal :modalAtTop="modalAtTop"/>
	</div>
</template>

<script>
	import BackNavBar from "components/common/navbar/BackNavBar";
	import LoginModal from "components/common/loginModal/LoginModal";
	export default {
		name: "Login",
		data() {
			return {
				modalAtTop: false
			};
		},
		components: {
			BackNavBar,
			LoginModal
		},
		methods: {
			pageClick(e) {
				this.modalAtTop = e.path.length >= 11;
			}
		}
	};
</script>

<style scoped>
	.login {
		width: 100%;
	}
	
	.nav-bar {
		background: rgba(255,255,255,0);
		color: black;
	}

	.img {
		width: 10px;
		padding-top: 13px;
	}
</style>
