// pages/userinfo/nickname/nickname.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    newNickname: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  useWxnickname: function(e) {
    if(e.detail.userInfo) {
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          nickName: e.detail.userInfo.nickName
        }
      }).then(() => {
        wx.showToast({
          title: 'Done',
        })
      })
    }
    this.setData({
      newNickname: ''
    })
    app.userInfo.nickName = e.detail.userInfo.nickName
  },
  handleInput: function(e) {
    this.setData({
      newNickname: e.detail.value
    })
  },
  changeNickname: function() {
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        nickName: this.data.newNickname
      }
    }).then(() => {
      wx.showToast({
        title: 'Done',
      })
    })
    app.userInfo.nickName = this.data.newNickname
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