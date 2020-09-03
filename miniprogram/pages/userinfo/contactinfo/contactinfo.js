// pages/userinfo/contactinfo/contactinfo.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    phoneNumber: '',
    wxNumber: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {
    this.setData({
      wxNumber: app.userInfo.wxNumber,
      phoneNumber: app.userInfo.phoneNumber
    })
  },
  wxInput: function(e) {
    this.setData({
      wxNumber: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  changeWxNumber: function() {
    wx.showLoading({
      title: 'Loading...'
    });
    let that = this
    let currentUser = app.userInfo
    db.collection('users').where({
      _id: currentUser._id
    }).update({
      data: {
        wxNumber: that.data.wxNumber
      }
    }).then(() => {
      wx.hideLoading({
        complete: (res) => {wx.showToast({
          title: '更新成功',
        })},
      })
    })
    app.userInfo.wxNumber = this.data.wxNumber
  },
  changePhoneNumber: function() {
    wx.showLoading({
      title: 'Loading...'
    });
    let that = this
    let currentUser = app.userInfo
    db.collection('users').where({
      _id: currentUser._id
    }).update({
      data: {
        phoneNumber: that.data.phoneNumber
      }
    }).then(() => {
      wx.hideLoading({
        complete: (res) => {wx.showToast({
          title: '更新成功',
        })},
      })
    })
    app.userInfo.wxNumber = this.data.phoneNumber
  },
  updateDB: function(par, newdata) {
    
  },
  onShow: function () {

  },
  onHide: function () {

  },
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