// pages/ditu/ditu.js
var QQMapWX = require('../qqmmp/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'MS3BZ-SZ5HJ-6XDFX-FDU4T-2LQYQ-NMBJL' // 必填 换成自己申请到的
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: '',
    lng: '',
    mak: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    demo.geocoder({
      address: '洪雅县正街50号',
      success: function (res) {
        console.log(res);
        var lng=res.result.location.lng;
        var lat=res.result.location.lat;
        that.setData({lng:lng,lat:lat});
        var mak = [{
          iconPath: "",
           id: 0,
          latitude: lat,
           longitude: lng,
           width: 35,
          height: 30,
          callout: { content: "    语言：珊珊是不是傻    \n    预计到达时间：10分钟    \n    车牌号：   12345",
          color: "#ff0000",
          fontSize: "16",
          borderRadius: "10",
          bgColor: "#ffffff",
          padding: "10",
          display:"ALWAYS"
 } }];
        that.setData({ mak:mak});
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})