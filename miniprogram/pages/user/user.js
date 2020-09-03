// pages/user/user.js
const app = getApp() // 通过getApp这个全局方法获得app这个全局对象
const db = wx.cloud.database()  // 初始化数据库
Page({
  data: {
    userPic: "../../images/user_default.jpg",
    userNickname: '',
    logged: false,
    disable: true,
    id: ''
  },
  onLoad: function (options) { // 监听页面加载

  },
  bindGetUserInfo (e) {
    let that = this
    let userInfo = e.detail.userInfo
    if(!this.data.logged && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto : userInfo.avatarUrl,
          nickName: userInfo.nickName,
          signature: '',
          phoneNumber: '',
          wxNumber: '', // wx号
          links: 0, // 点赞数
          time: new Date(), // 当前注册的时间（本地时间）
          showLocation: true,
          friendList: [],
          longitude: this.longitude,
          latitude: this.latitude,
          location: db.Geo.Point(this.longitude, this.latitude)
        },
        success: function(res) {// 读取信息
          db.collection('users').where({
            _id: res._id
          }).get().then(res => {
            app.userInfo = Object.assign(res.data[0]);
            that.setData({
              userPic: app.userInfo.userPhoto,
              userNickname: app.userInfo.nickName,
              logged: true
            })
          })
        }
      })
    }
  },
  onReady: function () { // 监听页面初次渲染完成
    this.getLocation();
    let that = this
    wx.cloud.callFunction({
      name: 'login'// 要调用的云函数名称
    }).then(res => {      
      db.collection('users').where({// 从db里获取到符合条件的记录
        _openid: res.result.openid
      }).get().then(res => {
        if(res.data.length) {
          app.userInfo = Object.assign(app.userInfo, res.data[0])
          that.setData({
            userPic: app.userInfo.userPhoto,
            userNickname: app.userInfo.nickName,
            logged: true,
            id: app.userInfo._id
          });
          // 用户登录上来之后，就可以开始监测message的变化。
          this.getMessage();
        }else {
          that.setData({
            disable: false
          })
        }
      })
    })
  },
  onShow: function () { // 监听页面显示 tabbar每次切换进入页面也会触发
    this.setData({
      userPic: app.userInfo.userPhoto,
      userNickname: app.userInfo.nickName
    })
  },
  getMessage () { // 监测好友请求list是否有变化
    db.collection('message').where({
      userId : app.userInfo._id  // 当前登录的用户的信息list
    }).watch({
      onChange: function(snapshot) {
        if(snapshot.docChanges.length) { // 如果有变化
          let list = snapshot.docChanges[0].doc.list
          if(list.length) {
            wx.showTabBarRedDot({
              index: 2
            });
            app.userMessage = list  // 把当前用户的好友申请消息传递给全局变量
          }else{
            wx.hideTabBarRedDot({
              index: 2,
            })
            app.userMessage = []
          }
        }
      },
      onError: function(err) {
        console.error('sssthe watch closed because of error', err)
      }
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
  }
})