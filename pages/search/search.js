// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://wz.xinruikj.cn/hy114/",
    list:[],
    value:""
  },
  // 拨号
  calling: function (e) {
    var tb = e.currentTarget.dataset.tb;
    wx.showModal({
      title: '提示',
      content: '要拨打 ' + tb + ' 吗?',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tb + "",
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  details: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  search: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../search/search?value=' + e.detail.value
    })
  },
  onLoad: function (o) {
    wx.showLoading({
      title: '加载中...',
    });
    console.log(o.value)
    var that=this;
    that.setData({value:o.value});
    wx.setNavigationBarTitle({
      title: o.value + ' -洪雅114'
    });
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethuangye.php',
      data: {
        kw: o.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        var data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          var arr = data[i].imgs.split(",");
          data[i].imgs = arr;
          if (data[i].title.length > 9) {
            var item = data[i].title.slice(0, 9) + '...';
            data[i].title = item;
          }
          if (data[i].site.length > 9) {
            var site = data[i].site.slice(0, 12) + '...';
            data[i].site = site;
          }
        }
        that.setData({ list: data });
      }
    });
    wx.hideLoading();
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