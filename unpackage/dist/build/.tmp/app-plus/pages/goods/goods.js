(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"275a":function(o,e,t){"use strict";t.r(e);var n=t("2860"),s=t.n(n);for(var a in n)"default"!==a&&function(o){t.d(e,o,function(){return n[o]})}(a);e["default"]=s.a},2860:function(o,e,t){"use strict";(function(o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a(t("d19a"));function a(o){return o&&o.__esModule?o:{default:o}}var u=function(){return t.e("pages/goods/goodsHeader").then(t.bind(null,"c883"))},i=function(){return t.e("components/popupSpec").then(t.bind(null,"d804"))},c={components:{handleHeader:u,"popup-spec":i},data:function(){return{goodsInfo:{name:"",price:"",number:1,spec:""},goodsData:{swiperList:[],spec:[],comment:[{face:"",content:"",username:""}],descriptionStr:""},currentSwiper:0,spaceInfo:{showSpace:!1},isKeep:!1}},onLoad:function(e){this.initData(),this.goodsInfo=JSON.parse(e.goodsInfo),console.log(o(this.goodsInfo," at pages\\goods\\goods.vue:120"))},methods:{initData:function(){var e=this;this.request({url:s.default.getGoods,success:function(t){console.log(o(t.data," at pages\\goods\\goods.vue:128")),e.goodsData=t.data}})},changeSwiper:function(o){this.currentSwiper=o.detail.current},handleRatings:function(){n.setStorageSync("comments",this.goodsData.comment),n.navigateTo({url:"./ratings"})},keep:function(){this.isKeep=!this.isKeep,this.isKeep&&n.showToast({icon:"success",title:"已收藏"})},joinCart:function(){var e=this;n.getStorage({key:"goodsList",success:function(o){var t=o.data,n=!1;t.forEach(function(o){o.goods_id==e.goodsInfo.goods_id&&o.spec==e.goodsInfo.spec&&(o.number+=e.goodsInfo.number,n=!0)}),n||(t.push(e.goodsInfo),e.setGoodsList(t))},fail:function(t){console.log(o("加入存储"," at pages\\goods\\goods.vue:180"));var n=[];n.push(e.goodsInfo),e.setGoodsList(n)}})},setGoodsList:function(e){console.log(o("存储到本地存储中"," at pages\\goods\\goods.vue:191")),n.setStorage({key:"goodsList",data:e,success:function(){n.showToast({icon:"success",title:"添加购物车成功"})}})},handleBuy:function(){var o=[];o.push(this.goodsInfo),n.setStorage({key:"confirmList",data:o,success:function(o){n.navigateTo({url:"../order/confirm"})}})}}};e.default=c}).call(this,t("0de9")["default"],t("6e42")["default"])},"29ea":function(o,e,t){"use strict";var n=function(){var o=this,e=o.$createElement;o._self._c;o._isMounted||(o.e0=function(e){o.spaceInfo.showSpace=!0})},s=[];t.d(e,"a",function(){return n}),t.d(e,"b",function(){return s})},"40a2":function(o,e,t){"use strict";(function(o){t("2df9"),t("921b");n(t("66fd"));var e=n(t("9863"));function n(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,t("6e42")["createPage"])},"6b22":function(o,e,t){"use strict";var n=t("db34"),s=t.n(n);s.a},9863:function(o,e,t){"use strict";t.r(e);var n=t("29ea"),s=t("275a");for(var a in s)"default"!==a&&function(o){t.d(e,o,function(){return s[o]})}(a);t("6b22");var u=t("2877"),i=Object(u["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},db34:function(o,e,t){}},[["40a2","common/runtime","common/vendor"]]]);