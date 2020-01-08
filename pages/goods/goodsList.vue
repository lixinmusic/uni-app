<template>
	<view>
	<view class="header">
		<!-- tab切换 全部  口碑  热门 -->
		<view @tap="handleSelected(index)" class="target" v-for="(item,index) in filterByList" :key="index" :class="{'on':item.selected}">
			{{item.text}}
		</view>
		</view>
		<!-- 占位tabbar -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" @tap="handleGoods(goods)" v-for="goods in goodsList" :key="goods.goods_id">
					<!-- //mode是一个属性来自动设置图片的长和宽 -->
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
					<view class="price">
						<text>￥</text>
						{{goods.price}}
					</view>
					<view class="slogan">{{goods.slogan}} <text>人付款</text></view>
				   </view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default {
	    data() {
			return {
				goodsList: [],//商品类别大数组
				filterby: 'all',//默认选中全部
				page: 1,
				size: 4,
				loadingText: '正在加载......',
				filterByList:[
					{text:'全部',selected:true,filterby:"all"},
					{text:'口碑',selected:false,filterby:"public"},
					{text:'热门',selected:false,filterby:"hot"}
				]
			}
		},
		onLoad(option) {
			console.log(option)
			uni.setNavigationBarTitle({//这个是页面跳转后改变了 标题 title
				title:option.name
			})
		  // 加载数据
		  this.loadDate()
		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				this.page = 1;
				this.loadingText = "加载中.....";
				this.goodsList = [];
				this.loadDate();
				uni.stopPullDownRefresh()//停止下拉刷新
			},1000)
		},
		//上拉加载
		onReachBottom() {
			this.page++;
			this.loadDate()
		},
		methods: {
			//点击tab切换的方法
			handleSelected(index) {
				this.filterByList[index].selected = true
				// 没选中的selected为false
				for (var i = 0; i<this.filterByList.length;i++) {
					if(i != index) {
						this.filterByList[i].selected = false
					}
				}
				// 这个是点击不同的tab请求的数据不同
			    // console.log(this.filterByList[index])
				this.filterby = this.filterByList[index].filterby;
				this.page = 1;
				this.loadDate();
				this.loadingText = '加载中...';
				this.goodsList = [];
			},
			//获取数据的方法
			loadDate() {
			  this.request({
				   url:interfaces.getGoodsList+'/'+this.filterby+'/'+this.page+'/'+this.size,
				  //这个是用的es6的字符串模板
				  // url:`${interfaces.getGoodsLst}/${this.filterby}/${this.page}/${this.size}`,
				  success:((res) => {
					  // console.log(res)
					  // this.goodsList = res.data
					  if (res.data.length>0) {//在上拉加载时做的判断
						  res.data.forEach(item => {
							  this.goodsList.push(item)
						  })
					  } else {
						  this.loadingText = "到底了......"
					  }
				  })
			  })
			},
			// 点击每个商品的详细内容
			handleGoods(goods) {
				// console.log(goods)
				uni.navigateTo({
					url:'./goods?goodsInfo='+JSON.stringify(goods)
				})
			}
		}
	}
</script>

<style lang="scss">
.header{
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
	.target{
		width: 20%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-bottom: -2upx;
		color: #aaa;
		
		&.on{
			color: #555;
			border-bottom: 4upx solid #f06c7a;
			font-weight: 600;
			font-size: 30upx;
		}
		.icon {
			font-size:26upx;
		}
	}
}
.place{
 background-color: #ffffff;
 height: 100upx;
}
.goods-list{
		.loading-text{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
		.product-list{
			width: 92%;
			padding: 0 4% 3vw 4%; 
			column-count:2;
			column-gap:1em;
			.product{
				break-inside: avoid;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0,0,0,0.1);
				image{
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}
				.name{
					width: 92%;
					padding: 6upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
					.price{
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan{
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
			
		}
	}
</style>
