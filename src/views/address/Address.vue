<template>
  <div class="address">
    <router-view v-show="showRouter"></router-view>
    <div class="content" v-show="!showRouter">
      <back-nav-bar class="nav-bar">
        <!-- <div v-slot="center">地址管理</div> -->
				<template v-slot:center><div>地址管理</div></template>
      </back-nav-bar>
      <address-item
        v-for="(item, index) in addresses"
        :key="index"
        :addrInfo="[item, index]"
        @click.native="chooseAddr(index)">
			</address-item>
      <div class="add-btn" @click="addNewAddress" v-show="isAddress">
        ＋ 新建收货地址
      </div>
    </div>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import AddressItem from "./childComps/AddressItem.vue";
import { mapGetters } from "vuex";
import { CHOOSE_ADDRESS } from "@/store/mutations-types";
export default {
  name: "Address",
  data() {
    return {
			isAddress: true
		}
  },
  props: ["type"],
  components: {
    BackNavBar,
    AddressItem
  },
  methods: {
    addNewAddress() {
			// 跳转到“新建收货地址时”，隐藏前面的“＋ 新建收货地址”按钮
			this.isAddress = !this.isAddress;
      this.$router.push("/address/newAddr");
    },
    chooseAddr(id) {
      if (this.type === "choose") {
        this.$store.commit(CHOOSE_ADDRESS, id);
        this.$router.back();
      }
    }
  },
  computed: {
    ...mapGetters({
      addresses: "userAddresses"
    }),
    showRouter() {
      return this.$route.path !== "/address";
    }
  }
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100vh;
}
.add-btn {
  position: fixed;
  bottom: 3%;
  left: 15%;
  right: 15%;
  border-radius: 21px;
  height: 42px;
  background-color: #ff4d55;
  text-align: center;
  line-height: 42px;
  font-weight: 500;
  color: white;
}
</style>
