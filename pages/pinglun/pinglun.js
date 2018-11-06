// pages/pinglun/pinglun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinglun:"",
    pno:1,
    id:"",
    img:[]
  },
  //图片预览
  previewImg: function () {
    var imgs = this.data.pinglun[0].imgs;
    console.log(imgs);
    var a=[imgs];
    wx.previewImage({
      current: imgs, //当前图片地址         
      urls: a,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    console.log(o);
    var user=o.id;
    var  that=this;
    user = user.split(",");
    var id=user[0];
    var name=user[1];
    console.log(id,name);
    wx.setNavigationBarTitle({
      title: name ? name : " " + ' 的评论-洪雅114'
    });
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/get_hyuser.php',
      data: {
        id: id,
        pno:that.data.pno
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        console.log(res.data);
        var pno =1;
        if(res.data.pageCont>1){
          pno =  (res.data.pno)++;
        }else{
          pno = (res.data.pno);
        }
        that.setData({ pinglun: res.data.data,pno:pno,id:id })
        
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
    var that=this;
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/get_hyuser.php',
      data: {
        id: that.data.id,
        pno: that.data.pno
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        console.log(res.data);
        var pno
        if (res.data.pageCont > 1) {
          pno = (res.data.pno)++;
        } else {
          pno = (res.data.pno);
        }
        that.setData({ pinglun: res.data.data, pno: pno})

      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})