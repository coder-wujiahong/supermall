<template>
    <div class="setting">
        <back-nav-bar class="nav-bar">
			<template v-slot:left><img src="~assets/img/common/back_black.png" alt="" class="img"></template>
			<template v-slot:center>设置</template>
        </back-nav-bar>
        <div class="list">
            <van-cell title="个人资料设置" is-link to="index" />
            <van-cell title="地址管理" is-link to="index" />
            <van-cell title="支付设置" is-link to="index" />
            <van-cell title="账号" is-link to="index" />
            
        </div>
        <div class="list">
            <van-cell title="发票抬头管理" is-link to="index" value="添加增票资质" />
            <van-cell title="通用" is-link to="index" value="清除本地缓存等"/>
            <van-cell title="标准版" is-link to="index" value="长辈版/标准版"/>
            <van-cell title="会员" is-link to="index" value="您有4张运费券待使用"/>
            
        </div>
        <div class="list">
            <van-cell title="安全中心" is-link to="index" />
            <van-cell title="我的二维码" is-link to="index" />
            <van-cell title="关于购物街" is-link to="index" />
            <van-cell title="把购物街分享给朋友" is-link @click="showShare = true" />
            <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
            />
        </div>  
    </div>
</template>

<script>
    import BackNavBar from 'components/common/navbar/BackNavBar'
    
    import { ref } from 'vue';
    import { Toast } from 'vant';

    export default {
        name: "Setting",
        components: { 
            BackNavBar
        },
        setup() {
            const showShare = ref(false);
            const options = [
            { name: '微信', icon: 'wechat' },
            { name: '微博', icon: 'weibo' },
            { name: '复制链接', icon: 'link' },
            { name: '分享海报', icon: 'poster' },
            { name: '二维码', icon: 'qrcode' },
            ];

            const onSelect = (option) => {
            Toast(option.name);
            showShare.value = false;
            };

            return {
            options,
            onSelect,
            showShare,
            };
        }
    }
</script>

<style scoped>
    .setting {
		width: 100%;
        background-color: #f2f2f2;
	}
    .nav-bar {
		background: white;
		color: black;
	}
    .img {
		width: 15px;
		height: 30px;
		padding-top: 10px;
	}
    .list {
        background-color: white;
        margin-top: 10px;
    }
</style>