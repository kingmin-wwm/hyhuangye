// pages/details/details.js
var QQMapWX = require('../qqmmp/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'MS3BZ-SZ5HJ-6XDFX-FDU4T-2LQYQ-NMBJL' // 必填 换成自己申请到的
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://wz.xinruikj.cn/hy114/",
    vlength:0,
    lat: '',lng: '',mak: [],
    list:{},
    mapshow:true,
    plkshow:false,
    tskshow:false,
    value:"",
    user:{},
    imgNumber:0,
    phone:'',
    pinglun:[],
    xiangguan:[]
  },
  bqmz: function () {
    wx.navigateTo({
      url: '../ditu/ditu',
    })
  },
  daohang:function(e){
    console.log(e);
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: e.target.dataset.lat,//要去的纬度-地址
          longitude: e.target.dataset.lng,//要去的经度-地址
          name: e.target.dataset.name,
          address: e.target.dataset.add
        })
      }
    })
  },
  //图片预览
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgs = this.data.list.imgs;
    for(var i=0;i<imgs.length;i++){
      imgs[i]=this.data.url+imgs[i];
    }
    var imgArr = imgs;
    // console.log(imgArr);
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //图片预览
  userImg: function () {
    var imgs = this.data.pinglun[0].imgs;
    console.log(imgs);
    var a = [imgs];
    wx.previewImage({
      current: imgs, //当前图片地址         
      urls: a,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ckpl:function(e){
    var id=e.target.dataset.id+","+e.target.dataset.name;
    wx.navigateTo({
      url: '../pinglun/pinglun?id='+id,
    })
  },
  //授权
  getUserInfo: function (e) {
    var that = this;
    var user =  {img:e.detail.userInfo.avatarUrl,name: e.detail.userInfo.nickName};
    console.log(user);
    var phone = e.detail.encryptedData + ',' + e.detail.iv + "," + e.detail.userInfo.nickName;
    var name=e.target.dataset.name;
    if(name==1){
      that.setData({plkshow:true,user:user,mapshow:false,phone:phone});
    }else if(name==2){
      that.setData({tskshow:true,user:user,mapshow:false,phone:phone});
    }
    
  },
  //取消
  quxiao:function(){
    this.setData({ plkshow: false, mapshow: true});
  },
  tsquxiao:function(){
    this.setData({ tskshow: false, mapshow: true});
  },
  //输入框
  inputBind: function (e) {
    this.setData({value: e.detail.value});
    console.log(this.data.value);
    var a=this.data.value.length;
    this.setData({vlength: a});
  },
  //发送评论
  open:function(){
    var that = this;
    var img=that.data.user.img;
    var name=that.data.user.name;
    var data = that.data.value;
    if (data == "") {
      wx.showToast({
        title: '内容不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '要发布吗?',
        success: function (res) {
          if(res.confirm){
            wx.showLoading({
              title: '提交中',
            });
            wx.request({
              url: 'https://wz.xinruikj.cn/hy114/php/adduser.php',
              data: {
                uname: name, imgs: img, data: data, phone: that.data.phone,id:that.data.list.id
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
                    wx.request({
                      url: 'https://wz.xinruikj.cn/hy114/php/get_hyuser.php',
                      data: {
                        id: that.data.list.id,
                        pgs:5
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success(res) {
                        // // console.log("请求的详情页"); 
                        // console.log(res.data);
                        that.setData({ pinglun: res.data.data })
                      }
                    });
                }
              }
            });
            console.log(img,name);
            that.setData({ plkshow: false, mapshow: true,value:""});
              wx.hideLoading();
          }else{
            console.log(2)
          }
        }
      })
    }
  },
  //发送投诉
  tsopen:function(){
    var that = this;
    var img=that.data.user.img;
    var name=that.data.user.name;
    var data = that.data.value;
    if (data == "") {
      wx.showToast({
        title: '内容不能为空',
        image: '../../imgs/clear.png',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '要发布吗?',
        success: function (res) {
          if(res.confirm){
            wx.showLoading({
              title: '提交中',
            });
            wx.request({
              url: 'https://wz.xinruikj.cn/hy114/php/addtoushu.php',
              data: {
                uname: name, imgs: img, toushu: data, phone: that.data.phone,id:that.data.list.id
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res);
                if(res.data.code==200){
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            });
            that.setData({ tskshow: false, mapshow: true,value:""});
              wx.hideLoading();
          }else{
            console.log(2)
          }
        }
      })
    }
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
  ckgd:function(e){
    var cls=e.currentTarget.dataset.cls;
    wx.navigateTo({
      url: '../list/list?cls=' + cls
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    console.log(o);
    //详情
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/details.php',
      data: {
        id: o.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        // console.log(res.errMsg);
        if(res.errMsg=="request:ok"){
          var data = res.data;
          var arr = data.imgs.split(",");
          data.imgs = arr;
          console.log(data);
          that.setData({ list: data, imgNumber:data.imgs.length});
          wx.setNavigationBarTitle({
            title: that.data.list.title ? that.data.list.title : " " + ' -洪雅114'
          });
          var mapt = " 名字：" + that.data.list.title +
            " \n 电话：" + (that.data.list.tbl ? that.data.list.tbl : that.data.list.phone) +
            " \n 地址：" + that.data.list.site ;
            // console.log(mapt);
          demo.geocoder({
            address: that.data.list.site,
            success: function (res) {
              // console.log(res);
              var lng = res.result.location.lng;
              var lat = res.result.location.lat;
              that.setData({ lng: lng, lat: lat });
              var mak = [{
                iconPath: "",
                id: 0,
                latitude: lat,
                longitude: lng,
                width: 35,
                height: 30,
                callout: {
                  content: mapt,
                  color: "#ff0000",
                  fontSize: "16",
                  borderRadius: "10",
                  bgColor: "#ffffff",
                  padding: "20",
                  display: "ALWAYS"
                }
              }];
              that.setData({ mak: mak });
            },
            fail: function (res) {
              // console.log(res);
            },
            complete: function (res) {
              // console.log(res);
            }
          });
        }
      }
    });
    //留言
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/get_hyuser.php',
      data: {
        id: o.id,
        pgs: 5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        // console.log(res.data);
        that.setData({pinglun:res.data.data})
        wx.request({
          url: 'https://wz.xinruikj.cn/hy114/php/gethuangye.php',
          data: {
            kw: that.data.list.subclass,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // // console.log("请求的详情页"); 
            console.log(res.data);
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
            // console.log(that.data.list.subclass);
            that.setData({ xiangguan: data })
            // console.log(that.data.pinglun);

          }
        });

      }
    });
    //相关
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