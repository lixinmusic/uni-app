
//这个是接口请求的封装文件
module.exports = (param) =>{
	var url = param.url;
	var method = param.methond;
	var header = param.header || {};
	var data = param.data || {};
	
	//判断请求方式是get 还是 post 
	if(method){
		method = method.toUpperCase() //把小写转为大写字母
		if(mrthod == "POST"){
			header = {"content-type":"application/x-www-form-urlencoded"}
		}
	}
	//发起请求  加载动画
	if(!param.hideLoading){
		uni.showLoading({title:"加载中..."})
	}
	//发起网络请求
	uni.request({
		url:url,
		method:method || "GET",
		header:header,
		data:data,
		success:res => {//请求成功
			if(res.statusCode && res.statusCode !=200) {//aip错误
				uni.showMode({
					content:res.msg
				})
				return
			}
			 typeof param.success == "function" && param.success(res.data);
		},
		fail:(e) => {//请求失败
			uni.showModal({
				content: e.meg
			})
			typeof param.fail == "function" && param.fail(e.data);
		},
		complete: (e) => {
			console.log("网络请求超时")
			uni.hideLoading()
			typeof param.complete == "function" && param.complete(e.data);
			return;
		},
	})
}