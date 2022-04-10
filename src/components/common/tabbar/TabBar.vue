<!-- 底部导航栏整体框架 -->
<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'TabBar'
	}
</script>

<style>
	#tab-bar{
		display: flex;
		background: #f6f6f6;
		
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		
		box-shadow: 0 -2px 10px rgba(100,100,100,.2)
	}
</style>
