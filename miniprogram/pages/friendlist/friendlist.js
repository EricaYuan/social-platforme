// pages/friendlist/friendlist.js
let app = getApp()
let db = wx.cloud.database()

Page({
  data: {
    friendList: []
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    // 找到所有user的friendList中有当前用户id的，这样他们就是当前用户的好友
    db.collection('users').where({
      friendList: app.userInfo._id
    }).get().then(res => {
      this.setData({
        friendList: res.data
      })
    })
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