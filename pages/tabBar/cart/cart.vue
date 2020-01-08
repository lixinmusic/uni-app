<template>
	<view>
	<!-- 这个页面是购物车 -->
	<view class="goods-list">
		<view class="empty" v-if="goodsList.length==0">购物车空，请添加购物车</view>
		<view class="row" v-for="(item,index) in goodsList" :key="index">
			<!-- 删除按钮 -->
			<view class="menu" @tap="handlendDelect(item)">
				<view class="icon iconfont">&#xe6a6;</view>
			</view>
			<!-- 商品 -->
			<view @touchstart="handlesp(index,$event)" @touchmove="handlemove(index,$event)"
			@touchend="handleend(index,$event)"
			 class="production" :class="[theIndex == index ? 'open':oldIndex == index ? 'close':'']">
				<!-- checkbox -->
				<view class="container" @tap="handleCheckbox(item)">
					<view class="checkbox">
						<view :class="{'on':item.selected}"></view>
					</view>
				</view>
				<!-- 商品详情 -->
				<view class="goods-info" @tap="handleGoodsinfo(item)">
					<view class="img">
						<image :src="item.img"></image>
					</view>
					<view class="info">
						<view class="title">{{item.name}}</view>
						<view class="spec">{{item.spec}}</view>
						<view class="price-number">
							<view class="price">￥{{item.price}}</view>
							<counter :goodsInfo="item" @change="sum"></counter>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 底部结算菜单 -->
	<view class="footer" :style="{bottom:footbottom}">
		<!-- checkbox -->
		<view class="container" @tap="handleSelectAll">
			<view class="checkbox">
				<view :class="{'on':isAllselect}"></view>
			</view>
			<view class="text">全选</view>
		</view>
		<view class="delBtn" @tap="handleAllDelet" v-if="selectedList.length>0">删除</view>
		<view class="settlement">
			<view class="sum">合计:<view class="money">{{sumPrice}}</view></view>
			<view class="btn" @tap="handleConfirm">结算{{selectedList.length}}</view>
		</view>
	</view>
 </view>
</template>

<script>
	import counter from '../../../components/counter.vue'
	export default {
		components:{
			counter
		},
		data() {
			return {
			  footbottom: 0,	
			  goodsList: [],
			  theIndex: null,//控制滑动效果，当前滑动下标
			  oldIndex: null,//上一个左滑下标
			  selectedList: [],
			  isAllselect: false,
			  sumPrice: '0.00'
			}
		},
		// 刚进页面从存储中取到的数据
		onShow() {
			uni.getStorage({
				key:"goodsList",
				success:(res => {
					console.log(res.data)
		             //刚进页面把商品设置成未选中状态
					for (let i=0;i<res.data.length;i++) {
						res.data[i].selected = false
					}
					this.goodsList = res.data
					//属性数据的初始化
					this.selectedList = []
					this.sumPrice = '0.00' 
					this.isAllselect = false
				})
			})
		},
		methods: {
			//复选框的选择
			handleCheckbox(item) {
			   item.selected =!item.selected
			   // 条件: 数组中是否包含该元素
			   let isExest = this.selectedList.indexOf(item)
			   if(isExest > -1) {
				   this.selectedList.splice(isExest,1);
			   } else {
			   // push到数组里
			   this.selectedList.push(item)
			  }
			  //判断全选状态
			  if (this.selectedList.length ==this.goodsList.length) {
				  this.isAllselect = true
			  } else {
				  this.isAllselect = false
			  }
			  this.sum()//合计
			},
			//全选按钮
			handleSelectAll() {
				this.isAllselect =!this.isAllselect
				//数据处理
				let arr = []
				this.goodsList.forEach((item,index) => {
					item.selected = this.isAllselect
					arr.push(item)
				})
				this.selectedList = this.isAllselect ? arr:[]
				this.sum()
			},
			//合计
			sum() {
				this.sumPrice = 0
				this.goodsList.forEach((item,index) => {
					if(item.selected) {
						this.sumPrice = this.sumPrice + (item.number * item.price)
					}
				})
				this.sumPrice = this.sumPrice.toFixed(2)
			},
			handleGoodsinfo(item) {
				uni.navigateTo({
					url:"../../goods/goods?goodsInfo=" + JSON.stringify(item)
				})
			},
			handlesp(index,event) {
				// 多点触控 不触发
				if (event.touches.length > 1) {
					return;
				}
				
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				
				// 初始化坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			handlemove(index,event) {
				// 多点触控 不触发
				if (event.touches.length > 1) {
					return;
				}
				
				// 移动位置
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				// 滑动位置小 不触发
				if (Math.abs(moveX) < 5) {
					return;
				}
				
				// 竖向滑动 不触发
				if (Math.abs(moveY) > Math.abs(moveX)) {
					return;
				}
				
				// 左滑
				if (moveX < 0) {
					this.theIndex = index;
				}
			},
			handleend(index,event) {
				
			},
			// 单个商品删除按钮
			handlendDelect(item) {
				console.log(item)
				//要更新storage
				uni.getStorage({
					key:'goodsList',
					success: (res) => {
						res.data.splice(res.data.indexOf(item),1)
						uni.setStorageSync("goodsList",res.data)
					}
				})
				//更新数组
				this.goodsList.splice(this.goodsList.indexOf(item),1)
				this.selectedList.splice(this.selectedList.indexOf(item),1)
				// 删除后的动画效果
				this.oldIndex = null
				this.theIndex = null;
				
				this.sum() //合计重新计算
			},
			// 全部删除
			handleAllDelet() {
				while(this.selectedList.length>0){
					this.handlendDelect(this.selectedList[0])
				}
				this.selectedList = []
				this.isAllselect = []
				this.sum()
			},
			//点击结算的时候要做的操作
			handleConfirm() {
				if (this.selectedList.length < 1) {
					uni.showToast({
						title:"请选择要结算的商品",
						icon:'none'
					})
					return
				}
				//选择商品的话就本地存储
				uni.setStorage({
					key:"confirmList",
					data:this.selectedList,
					success: (res) => {
						uni.navigateTo({
							url:'../../order/confirm'
						})
					}
				})
			}
				
		},
		onLoad() {
			// 兼容h5的底部结算
			// #ifdef H5
			this.footbottom = document.getElementsByTagName("uni-tabbar")[0].offsetHeight+"px"
			// #endif
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
	
		.checkbox {
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;
	
			.on {
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}
	
		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}
	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;
	
		.empty {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #a7a7a7;
		}
	
		.row {
			width: calc(92%);
			height: calc(22vw + 40upx);
			margin: 20upx auto;
	
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
	
			.menu {
				.icon {
					color: #fff;
					font-size: 60upx;
				}
	
				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
	
			.production {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}
	
					100% {
						transform: translateX(-30%);
					}
				}
	
				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}
	
					100% {
						transform: translateX(0);
					}
				}
	
				&.open {
					animation: showMenu 0.25s linear both;
				}
	
				&.close {
					animation: closeMenu 0.15s linear both;
				}
	
				background-color: #fff;
	
				.container {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}
	
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;
	
				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;
	
					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;
	
						image {
							width: 22vw;
							height: 22vw;
						}
					}
	
					.info {
						width: 100%;
						height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;
	
						.title {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}
	
						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}
	
						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;
	
							.price {}
	
						}
					}
				}
			}
		}
	}
.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.delBtn {
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 30upx;
			}
		}
	}	

</style>
