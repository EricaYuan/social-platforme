// pages/userinfo/location/location.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    showLocation: true
  },

  onLoad: function (options) {

  },

  onReady: function () {
    this.setData({
      showLocation: app.userInfo.showLocation
    })
  },
  switchChange: function(e) {
    let that = this
    this.setData({
      showLocation: e.detail.value
    })
    wx.showLoading({
      title: 'Loading...',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        showLocation: that.data.showLocation
      }
    }).then(() => {
      wx.hideLoading({
        complete: (res) => {wx.showToast({
          title: '更新成功',
        })},
      })
    })
    app.userInfo.showLocation = this.data.showLocation
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