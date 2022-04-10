<template>
  <div class="page-content">
    <new-address :pageInfo="currentInfo"></new-address>
  </div>
</template>

<script>
import NewAddress from './NewAddress'
import BackNavBar from 'components/common/navbar/BackNavBar'
import { mapGetters } from 'vuex'
export default {
  name: "ModifyAddress",
  data() {
    return {};
  },
  components: {
    NewAddress,
    BackNavBar
  },
  props: ["aid"],
  computed: {
    ...mapGetters({
      addresses: "userAddresses"
    }),
    currentInfo() {
      // 避免乱输小数aid绕过了导航守卫正则判断的bug
      const aid = Math.floor(this.aid);
      return this.addresses[aid];
    }
  }
};
</script>

<style scoped>
.false {
	border: 1px solid #000000;
  width: 32vw;
  height: 20vw;
  margin: 30vh auto;
  text-align: center;
  font-weight: 700;
  color: brown;
  font-size: 20px;
}
</style>
