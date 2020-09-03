// pages/message/message.js
let app = getApp();

Page({
  data: {
    userMessage: [],
    logged: false
  },
  onShow: function () {
    if(app.userInfo._id) {
      this.setData({
        logged: true,
        userMessage: app.userMessage
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/user/user',
            }, 2000)
          })
        }
      })
    }
  },
  removeEvent(par) {
    this.setData({
      userMessage: []
    }, () => {
      this.setData({
        userMessage: par.detail
      })
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {

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