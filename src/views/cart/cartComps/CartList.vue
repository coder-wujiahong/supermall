<template>
	<div class="cart-list">
		<!-- <li v-for="item in cartList" :key="item">{{item}}</li> -->
		<cart-list-item 
			v-for="(item, index) in cartList" 
			:product="item" 
			:key="index"/>
	</div>
</template>

<script>
	import CartListItem from './CartListItem.vue'
	
	import { mapGetters } from 'vuex'
	
	export default {
		name: "CartList",
		components: {
			CartListItem
		},
		computed: {
			...mapGetters(['cartList'])
		}
	}
</script>

<style scoped>
</style>
