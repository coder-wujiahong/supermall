<!--新建收货地址页-->
<template>
	<div class="page-content">
		<back-nav-bar class="gray">
			<template v-slot:left>
				<img src="~assets/img/common/back_white.png" alt="" class="left-btn">
			</template>
			<template v-slot:center>
				<div class="center">{{ diffUI.title }}收货地址</div>
			</template>
			<template v-slot:right>
				<div @click="delAddr" v-if="diffUI.navRight">删除</div>
			</template>
		</back-nav-bar>
		
		<div class="info" @click="focusWhich">
			<div class="name">
				<div class="table-name">收货人</div>
				<input 
					ref="name" 
					class="input-content" 
					type="text" 
					placeholder="请填写收货人姓名" 
					:value="cacheAddr.name" />
			</div>
			<div class="phone">
				<div class="table-name">手机号码</div>
				<input 
					ref="phone" 
					class="input-content" 
					type="text" 
					placeholder="请填写收货人手机号" 
					:value="cacheAddr.phone" />
			</div>
			<div class="address">
				<div class="table-name">所在地区</div>
				<input
					type="text"
					ref="area"
					@click="areaChoose"
					class="input-content"
					placeholder="请选择省市区" 
					:value="chooseValue"/>
				<van-popup
					v-model:show="showAddrPopup"
					round
					position="bottom"
					:style="{ height: '40%' }">
					<van-area 
						title="请选择地区"
						:area-list="areaList"
						@cancel="cancelClick"
						@confirm="ConfirmClick"
						@visible-item-count="7"/>
				</van-popup>
			</div>
			<div class="detail-address">
				<div class="table-name">详细地址</div>
				<textarea 
					ref="addr" 
					class="input-content" 
					type="text" 
					placeholder="街道、楼牌号等"
					:value="cacheAddr.addr" />
			</div>
    	</div>

		<div class="default">
			<div class="left">
				<div class="sub-title">设置默认地址</div>
				<div class="tip">提醒：每次下单会默认推荐使用该地址</div>
			</div>
			<div class="right">
				<input
				ref="default"
				class="right-check"
				type="checkbox"
				:checked="cacheAddr.default"/>
			</div>
		</div>
		<div class="save" @click="savAddr" v-show="isCompShow">保存</div>		
	</div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import { setItem } from "common/utils";
import { resetResizeMixin, deepCopyMixin } from "common/mixin";
import { mapState } from "vuex";
import { NEW_ADDRESS, MOD_ADDRESS, DEL_ADDRESS } from "@/store/mutations-types";
import { ref } from 'vue';
// 导入中国默认的省市区数据列表
import { areaList } from '@vant/area-data';

export default {
	name: "NewAddress",
	components: {
		BackNavBar
	},
	mixins: [resetResizeMixin, deepCopyMixin],
	props: {
		pageInfo: {
		type: Object,
		default() {
			return { 
				name: "",
				phone: "",
				area: "",
				addr: "",
				default: false,
				chosen: false
				};
			}
		}
	},
	data() {
		return {
			initialHeight: outerHeight,
			cacheAddr: {},
			areaList, // 省市区列表
			showAddrPopup: false, // 弹出层展示
			chooseValue: "" // “请选择省市区”点击后的具体数据展示
		};
	},
	methods: {
		delAddr() {
		// 先跳转再删除，避免显示bug或获取数据出错，且不允许返回
		this.$router.replace("/address");
		this.$store.commit(DEL_ADDRESS, this.pageInfo);
		setItem(this.loggedInUser, this.userInfo[this.loggedInUser]);
		this.$router.back();
		},
		savAddr() {
		// 保存时获取用户的输入作为地址信息保存，用v-model的话修改后不保存直接点后退也能修改成功
		// 所以不用v-model，改用$refs获取表单数据
		const newInfo = {
			name: this.$refs.name.value,
			phone: this.$refs.phone.value,
			area: this.$refs.area.value,
			addr: this.$refs.addr.value,
			default: this.$refs.default.checked,
			id: this.pageInfo.id
		};
		if (newInfo.id !== undefined) {
			// 填写完整信息则保存，否则提示且return
			if (newInfo.name && newInfo.phone && newInfo.area && newInfo.addr) {
			this.$store.commit(MOD_ADDRESS, newInfo);
			} else {
			// this.$toast.show("请填写完整信息");
				this.$toast("请填写完整信息");
				return;
			}
		} else {
			if (newInfo.name && newInfo.phone && newInfo.area && newInfo.addr) {
			this.$store.commit(NEW_ADDRESS, newInfo);
			} else {
			// this.$toast.show("请填写完整信息");
				this.$toast("请填写完整信息");
				return;
			}
		}
		setItem(this.loggedInUser, this.userInfo[this.loggedInUser]);
		this.$router.back();
		},
		// 只用覆盖部分数据，所以使用assign
		saveAddrCache() {
		Object.assign(this.cacheAddr, {
			name: this.$refs.name.value,
			phone: this.$refs.phone.value,
			area: this.$refs.area.value,
			addr: this.$refs.addr.value,
			default: this.$refs.default.checked
		});
		},
		// 辅助获取输入框焦点的功能
		focusWhich(e) {
		let which;
		if (this.pageInfo.id === undefined) {
			which = e.path[e.path.length - 9].children[1];
		} else {
			which = e.path[e.path.length - 10].children[1];
		}
		which.focus();
		},
		// “请选择省市区”按钮
		areaChoose() {
			this.showAddrPopup = true;
			this.chooseValue = ''
		},
		// 省市区取消按钮
		cancelClick() {
			this.showAddrPopup = false;
			this.chooseValue = ''
		},
		// 省市区确认按钮
		ConfirmClick(data) {
			for(let i=0; i<data.length; i++){
				// 将省市区数据显示在“请选择省市区”上
				this.chooseValue = this.chooseValue + data[i].name;
				this.showAddrPopup = false;
			}
		}

	},
	computed: {
		...mapState(["loggedInUser", "userInfo"]),
		diffUI() {
		return this.$route.path.indexOf("newAddr") !== -1 ? { title: "新建", navRight: false } : { title: "修改", navRight: true };
		}
	},
	mounted() {
		this.deepCopy(this.cacheAddr, this.pageInfo);
		this.resetResize("addr");
	}
}
</script>

<style scoped>
	.page-content {
		width: 100%;
		height: 100%;
		background-color: rgb(246, 246, 246);
	}
	/* 顶部导航栏 */
	.gray {
		background-color: var(--color-tint);
		color: white;
	}
	/* 左上角按钮 */
	.left-btn {
		width: 10px;
		padding-top: 15px;
	}
	/* 上边整个框 */
	.info,
	.default {
		background-color: #fff;
		border-radius: 15px;
		padding: 0 20px;
		margin-top: 10px;
	}
	/* 左边信息框样式 */
	.name,
	.phone,
	.address {
		border-bottom: 3px solid rgb(246, 246, 246);
		height: 65px;
		line-height: 65px;
		display: flex;
		padding-top: 10px;		
	}
	/* 收货人、手机号码 */
	.table-name {
		width: 25%;
		font-weight: 550;
	}
	/* 详细地址外围 */
	.detail-address {
		display: inline-flex;
		width: 100%;
		height: 90px;
		font-weight: 550;
		padding-top: 10px;
	}
	/* 填写框 */
	.info .input-content {
		width: 75%;
		font-weight: 700;
		font-size: 15px;
		padding-top: 12px;
		border: 0;
	}
	.info .input-content::placeholder {
		color: #ccc;
		font-weight: 400;
	}

	/* 设置默认地址 */
	.default {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
		height: 85px;
	}
	.default .left,
	.default .right {
		display: flex;
		height: 85px;
		padding: 15px 0;
		flex-direction: column;
		justify-content: space-around;
	}
	.left .sub-title {
		font-weight: 550;
	}
	.left .tip {
		font-size: 14px;
	}
	.right .right-check {
		width: 20px;
		height: 20px;
	}

	/* 保存按钮 */
	.save {
		position: fixed;
		width: 80%;
		top: 80%;
		left: 10%;
		right: 10%;
		justify-content: center;
		border-radius: 21px;
		height: 42px;
		background-color: #ff4d55;
		text-align: center;
		line-height: 42px;
		font-weight: 500;
		color: white;
	}
</style>
