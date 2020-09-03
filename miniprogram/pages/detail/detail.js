// pages/detail/detail.js
const db = wx.cloud.database()
const app = getApp();
Page({
  data: {
    isFriend: false,
    detail: {},
    showBtn: true
  },
  onLoad: function (options) {
    db.collection('users').doc(options.userId).get().then(res => {
      this.setData({
        detail: res.data
      })
      let friendList = res.data.friendList
      // 看一下点击的这个用户的friendlist中有没有当前登录的用户
      if(friendList.includes(app.userInfo._id)) {
        this.setData({
          isFriend: true
        })
      }else {
        if(app.userInfo._id == this.data.detail._id) {
          // 如果相同，那就是当前用户本人的页面
          this.setData({
            isFriend: true,  // 显示联系方式
            showBtn: false // 隐藏按钮
          })
        }
      }
    })
  },
  addFriend() {
    if(app.userInfo._id) {
      // 如果当前用户已经登录，直接添加好友
      db.collection('message').where({
        userId : this.data.detail._id
      }).get().then(res => {
        if(res.data.length) {// update
          if(res.data[0].list.includes(app.userInfo._id)){
            wx.showToast({
              title: '已申请',
            })
          }else{ // 如果当前用户没有在已申请的list中，那要添加进去
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'message',
                where: {
                  userId : this.data.detail._id
                },
                data: `{list : _.unshift('${app.userInfo._id}')}`
              }
            }).then(res => {
              wx.showToast({
                title: '添加成功~',
              })
            }).catch(err => {
            })
          }
        }else { // add
          db.collection('message').add({
            data : {
              userId : this.data.detail._id, // 被添加的人
              list: [app.userInfo._id]  // 申请人（登录账号的人）
            }
          }).then(res => {
            wx.showToast({
              title: '成功',
            })
          })
        }
      })
    }else{
      // 如果当前用户未登录，先登录
      wx.showToast({
        title: '请先登录',
        duration: 2000,
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '../../pages/user/user',
            }, 2000)
          })
        }
      })
    }
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