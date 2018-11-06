// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toplist:[],
    newlist:[],
    url:"https://wz.xinruikj.cn/hy114/",
    clsshow: true,
    listshow:true,
    newshow:false,
    bmshow:false,
    tskshow: false,
    addshow: false,
    uname:"",
    title:"",
    site:"",
    uphone:"",
    user: {},
    vlength: 0,
    phone: '',
    value:"",
    classname:[
      { name: "餐饮美食", img:"../../imgs/ms.png"},
      { name: "休闲娱乐", img:"../../imgs/xx.png"},
      { name: "旅游出行", img:"../../imgs/ly.jpg"},
      { name: "教育培训", img:"../../imgs/jy.png"},
      { name: "医疗卫生", img:"../../imgs/yl.png"},
      { name: "党政社团", img:"../../imgs/dz.png"},
      { name: "房产建材", img:"../../imgs/fc.png"},
      { name: "农牧业", img:"../../imgs/lm.png"},
      { name: "企业/工厂", img:"../../imgs/qy.png"},
      { name: "生活服务", img:"../../imgs/sh.png"},
      { name: "商务服务", img:"../../imgs/sw.png"},
      { name: "其他类别", img:"../../imgs/qt.png"}
    ],
    bmtb:[
      {name:"市长电话",tbl:12345},
      {name:"匪警中心",tbl:110},
      {name:"急救中心",tbl:120},
      {name:"消防中心",tbl:119},
      {name:"交通事故",tbl:122},
      { name:"短信报警",tbl:12110},
      {name:"森林火警",tbl:95119},
      {name:"供电局",tbl:95598},
      { name:"移动客服",tbl:10086},
      {name:"联通客服",tbl:10010},
      {name:"电信客服",tbl:10000},
      {name:"天气预报",tbl:12121},
      {name:"报时服务",tbl:12117},
      { name:"消费者举报",tbl:12315},
      {name:"红十字",tbl:999},
    
    ]
  },
  bqmz:function(){
    wx.navigateTo({
      url: '../ditu/ditu',
    })
  },
  addhy:function(e){
    var name=e.target.dataset.name;
    var value=e.detail.value;
    if(name=="uname"){
      this.setData({uname:value})
    };
    if(name=="title"){
      this.setData({title:value})
    };
    if(name=="site"){
      this.setData({site:value})
    };
    if(name=="phone"){
      this.setData({uphone:value})
    };
  },
  //授权
  getUserInfo: function (e) {
    var that = this;
    var user = { img: e.detail.userInfo.avatarUrl, name: e.detail.userInfo.nickName };
    console.log(user);
    var phone = e.detail.encryptedData + ',' + e.detail.iv + "," + e.detail.userInfo.nickName;
    var name = e.target.dataset.name;
    if (name == 1) {
      that.setData({ addshow: true});
    } else if (name == 2) {
      that.setData({ tskshow: true, user: user, phone: phone });
    }

  },
  //取消
  quxiao: function () {
    this.setData({ addshow:false });
  },
  tsquxiao: function () {
    this.setData({ tskshow: false });
  },
  //输入框
  inputBind: function (e) {
    this.setData({ value: e.detail.value });
    console.log(this.data.value);
    var a = this.data.value.length;
    this.setData({ vlength: a });
  },
  //发送评论
  open: function () {
    var that = this;
    var name = that.data.uname;
    var title = that.data.title;
    var site = that.data.site;
    var uphone = that.data.uphone;
    if(name==""){
      wx.showToast({
        title: '联系人不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    }else if(title==""){
      wx.showToast({
        title: '店铺名不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    }else if (site == "") {
      wx.showToast({
        title: '地址不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    } else if (uphone == "") {
      wx.showToast({
        title: '电话不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '要发布吗?',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '提交中',
            });
            wx.request({
              url: 'https://wz.xinruikj.cn/hy114/php/addhy.php',
              data: {
                uname: name,
                title: title,
                site: site,
                phone: uphone, id: 0
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.setData({ addshow: false, uname: "", title: "", site: "", uphone: "" });
                }
              }
            });
            wx.hideLoading();
          } else {
            console.log(2)
          }
        }
      })
    }
  },
  //发送投诉
  tsopen: function () {
    var that = this;
    var img = that.data.user.img;
    var name = that.data.user.name;
    var data = that.data.value;
    if(data==""){
      wx.showToast({
        title: '内容不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '要发布吗?',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '提交中',
            });
            wx.request({
              url: 'https://wz.xinruikj.cn/hy114/php/addtoushu.php',
              data: {
                uname: name, imgs: img, toushu: data, phone: that.data.phone, id: 0
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res);
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            });
            that.setData({ tskshow: false, mapshow: true, value: "" });
            wx.hideLoading();
          } else {
            console.log(2)
          }
        }
      })
    }
  },
  search:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../search/search?value=' + e.detail.value
    })
  },
  cls:function(e){
    var cls=e.currentTarget.dataset.cls;
    console.log(cls);
    wx.navigateTo({
      url: '../list/list?cls='+cls
    })
  },
  details:function(e){
    var id=e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id='+id
    })
  },
  clsshow:function(){
    var show=this.data.clsshow;
    if(!show){
      this.setData({clsshow:true})
    }else{
      this.setData({clsshow:false})
    }
  },
  listshow:function(){
    var show = this.data.listshow;
    if(!show){
      this.setData({listshow:true});
      this.setData({bmshow:false});
      this.setData({newshow:false});
    }
  },
  newshow:function(){
    var show=this.data.newshow;
    if(!show){
      this.setData({ newshow: true });
      this.setData({ bmshow: false });
      this.setData({ listshow: false });
    }
  },
  bmshow:function(){
    var show=this.data.bmshow;
    if(!show){
      this.setData({ bmshow: true });
      this.setData({ listshow: false });
      this.setData({ newshow: false });
    }
  },
  // 拨号
  calling: function (e) {
    var tb=e.currentTarget.dataset.tb;
    wx.showModal({
      title: '提示',
      content: '要拨打 '+tb+' 吗?',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: tb+"",
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    var that=this;

    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethyindex.php',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       // console.log("请求的详情页"); console.log(res.data);
       console.log(res);
        var data = res.data.data;
        console.log(data[0].imgs.length);
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
          if (data[i].imgs.length !== ""){
          var arr = data[i].imgs.split(",");
          data[i].imgs = arr;
          }
          if(data[i].title.length>9){
          var item = data[i].title.slice(0, 9)+'...';
          data[i].title = item;
          }
          if(data[i].site.length>9){
          var site = data[i].site.slice(0, 12)+'...';
          data[i].site = site;
          }
        }
        that.setData({toplist:data});
      }
    });
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethuangye.php',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log("请求的详情页"); console.log(res.data);
        var data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].imgs.length !== "") {
            var arr = data[i].imgs.split(",");
            data[i].imgs = arr;
          };
          if (data[i].title.length > 9) {
            var item = data[i].title.slice(0, 9) + '...';
            data[i].title = item;
          }
          if (data[i].site.length > 9) {
            var site = data[i].site.slice(0, 12) + '...';
            data[i].site = site;
          }
        }
        that.setData({ newlist: data });
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