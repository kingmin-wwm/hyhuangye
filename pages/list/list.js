// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subclass: [],
    list:[],
    newlist:[],
    sublist:[],
    name: "分类选择",
    url: "https://wz.xinruikj.cn/hy114/",
    listshow: true,
    newshow: false,
    clsshow: false,
    sclsshow:true,
    pnomrs:false,
    pnonews:false,
    pnofls:false,
    pnomr:1,
    pnonew:1,
    pnofl:1
  },
  search: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../search/search?value=' + e.detail.value
    })
  },
  clsshow: function () {
    var show = this.data.clsshow;
    if (!show) {
      this.setData({ clsshow: true });
      this.setData({ sclsshow: true });
      this.setData({ listshow: false });
      this.setData({ newshow: false });
    }else{
      this.setData({ sclsshow: true });
    }
    var that = this;
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethylist.php',
      data: {
        kw: that.data.list[0].class,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.pageCount);
        var data = res.data.data;
        var pno = that.data.pnonew;
        console.log(pno);
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
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnonews: true });
        } else {
          that.setData({ pnonews: false });
        }
        that.setData({  pnofl: pno, sublist: data });
      }
    });
  },
  listshow: function () {
    var show = this.data.listshow;
    if (!show) {
      this.setData({ listshow: true });
      this.setData({ clsshow: false });
      this.setData({ newshow: false });
    }
  },
  newshow: function () {
    var show = this.data.newshow;
    if (!show) {
      this.setData({ newshow: true });
      this.setData({ clsshow: false });
      this.setData({ listshow: false });
    }
    var that=this;
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethylist.php',
      data: {
        kw: that.data.list[0].class,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.pageCount);
        var data = res.data.data;
        var pno = that.data.pnonew;
        console.log(pno);
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
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnonews: true });
        } else {
          that.setData({ pnonews: false });
        }
        that.setData({ newlist: data, pnonew: pno, sublist: data });
      }
    });
  },
  pnonew:function(){
    var that = this;
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethylist.php',
      data: {
        kw: that.data.list[0].class,
        pno:that.data.pnonew
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.pageCount);
        var data = res.data.data;
        var pno = that.data.pnonew;
        console.log(pno);
        var list = that.data.newlist;
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
          list.push(data[i]);
        }
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnonews: true });
        } else {
          that.setData({ pnonews: false });
        }
        that.setData({ newlist: list, pnonew: pno, sublist: data });
      }
    });
  },
  // 分类选择函数
  cls:function(e){
    var that=this;
    var value=e.target.dataset.cls;
    console.log(value);
    if(value=="默认分类"){
      // that.listshow();
      that.setData({ sclsshow: false,name:value });
      that.setData({ sublist: that.data.newlist });
      console.log(that.data.sublist);
    }else{
      console.log("发送"+value+"的请求");
      that.setData({ sclsshow: false,name:value });
      wx.request({
        url: 'https://wz.xinruikj.cn/hy114/php/gethysubcls.php',
        data: {
          kw: value,
          istop:1,
          pgs:100
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res); 
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
          wx.request({
            url: 'https://wz.xinruikj.cn/hy114/php/gethysubcls.php',
            data: {
              kw: value,
              istop: 0,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res);
              var pno = that.data.pnofl;
              var dat = res.data.data;
              for (var i = 0; i < dat.length; i++) {
                var arr = dat[i].imgs.split(",");
                dat[i].imgs = arr;
                if (dat[i].title.length > 9) {
                  var item = dat[i].title.slice(0, 9) + '...';
                  dat[i].title = item;
                }
                if (dat[i].site.length > 9) {
                  var site = dat[i].site.slice(0, 12) + '...';
                  dat[i].site = site;
                }
                data.push(dat[i]);
              }
              if (res.data.pageCount > pno) {
                pno++;
                that.setData({ pnofls: true });
              } else {
                that.setData({ pnofls: false });
              }

              that.setData({ pnofl: pno });
            }
          });
              that.setData({ sublist: data });
        }
      });
    }

  },
  pnofl(){
    var that=this;
    var pno=that.data.pnofl;
    var data=that.data.sublist;
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethysubcls.php',
      data: {
        kw: value,
        istop: 0,
        pno:pno
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        var dat = res.data.data;
        for (var i = 0; i < dat.length; i++) {
          var arr = dat[i].imgs.split(",");
          dat[i].imgs = arr;
          if (dat[i].title.length > 9) {
            var item = dat[i].title.slice(0, 9) + '...';
            dat[i].title = item;
          }
          if (dat[i].site.length > 9) {
            var site = dat[i].site.slice(0, 12) + '...';
            dat[i].site = site;
          }
          data.push(dat[i]);
        }
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnofls: true });
        } else {
          that.setData({ pnofls: false });
        }
        that.setData({ sublist: data, pnofl: pno });

      }
    });
  },
  details: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../details/details?id=' + id
    })
  },
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
  /**
   * 生命周期函数--监听页面加载
   * https://wz.xinruikj.cn/hy114/php/get_hyclass.php
   */
  onLoad: function (o) {
    wx.showLoading({
      title: '加载中...',
    });
    console.log(o);
    var that=this;
    wx.setNavigationBarTitle({
      title: o.cls+' -洪雅114'
    });
    // 默认
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethylist.php',
      data: {
        kw: o.cls,
        istop:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        var data = res.data.data;
        var pno = that.data.pnomr;
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
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnomrs: true });
        } else {
          that.setData({ pnomrs: false });
        }
           wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/gethylist.php',
      data: {
        kw: o.cls,
        istop:1,
        pgs:30
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        var data = res.data.data;
        var pno = that.data.pnomr;
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
        if (res.data.pageCount > pno) {
          pno++;
          that.setData({ pnomrs: true });
        } else {
          that.setData({ pnomrs: false });
        }
        that.setData({ list: data, pnomr:pno });
      }
    });
        that.setData({ list: data, pnomr:pno });
      }
    });
    wx.request({
      url: 'https://wz.xinruikj.cn/hy114/php/get_hyclass.php',
      data: {
        kw: o.cls,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // // console.log("请求的详情页"); 
        console.log(res.data);
        that.setData({subclass:res.data});
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