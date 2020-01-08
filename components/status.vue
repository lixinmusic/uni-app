<template>
	<!-- 状态栏 这个组件是来消除在iOS和android在电池一栏看到上滑的内容-->
	<view class="status"></view>
</template>

<script>
</script>

<style lang="scss">
	.status {
		width: 100%;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
</style>
