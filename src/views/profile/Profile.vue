<template>
  <div class="profile">

    <nav-bar class="nav-bar">
			<template v-slot:center><div>我的</div></template>
    </nav-bar>
    <!-- 登录、注册 -->
    <user-info></user-info>
		
		<scroll class="content"
				ref="scrollClick" 
				:probe-type="3" 
				:pull-up-load="true"
				@pullingUp="loadMore">
    <!-- 余额、优惠、积分 -->
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
			<section class="account">
				<div class="account-item">
					<div class="number"><span class="balance">0.00</span>元</div>
					<div class="account-info">我的余额</div>
				</div>
				<div class="account-item">
					<div class="number"><span class="balance">0</span>个</div>
					<div class="account-info">我的优惠</div>
				</div>
				<div class="account-item">
					<div class="number"><span class="balance">0</span>分</div>
					<div class="account-info">我的积分</div>
				</div>
			</section>
			<!-- 四列菜单 -->
			<list-view></list-view>
		
			<!-- 退出登录 -->
			<div class="logout" v-show="isIn" @click="logOut">退出登录</div>
		</scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import UserInfo from './childComps/UserInfo.vue'
import ListView from './childComps/ListView.vue'

import { setItem, getItem } from "common/utils"
import { LOGGED_OUT } from "@/store/mutations-types"
import { mapState } from "vuex"

export default {
  name: 'Profile',
  components: {
    NavBar,
	Scroll,
    UserInfo,
    ListView
  },
  methods: {
    // itemClick(index) {
    //   if (index === 0) {
    //     this.$router.replace('/cart')
    //   }
    // },
		logOut() {
		  const userInfo = getItem(this.user);
		  // localStorage里指定user的登录状态置为false
		  userInfo.isLoggedIn = false;
		  setItem(this.user, userInfo);
		  // 登录用户置空
		  setItem("loggedInUser", "");
		  this.$store.commit(LOGGED_OUT, this.user);
		}
  },
	computed: {
	  ...mapState({
	    isIn: "loggedIn",
	    user: "loggedInUser"
	  })
	}
}
</script>

<style scoped>
	.content {
		overflow: hidden;
		position: absolute;
		top: 130px;
		bottom: 49px;
		left: 0;
		right: 0;
		background-color: #f2f2f2;
	}
	
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}
		
	.account {
		display: flex;
	}
	
	.account-item {
	  margin-right: 1px;
	  width: 100%;
	  background-color: #fff;
	  padding: 18px;
	  text-align: center;
	  color: #666;
	  font-size: 13px;
	}
	
	.account-item:last-of-type {
	  margin-right: 0;
	}
	
	.account-item .balance {
	  font-weight: 700;
	  font-size: 24px;
	  color: #ff5f3e;
	}
	
	.account-info {
	  margin-top: 6px;
	}
	
	.logout {
		width: 100%;
	  height: 44px;
		line-height: 44px;
		background-color: #FF4D55;
	  /* background-color: #fff; */
	  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
	  
	  text-align: center;
	  font-size: 15px;
	  color: white;
		margin-top: 20px;
	}

</style>
