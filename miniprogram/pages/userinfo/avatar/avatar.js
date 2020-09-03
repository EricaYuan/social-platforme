// pages/userinfo/avatar/avatar.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    avatarUrl: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {
    this.setData({
      avatarUrl: app.userInfo.userPhoto
    })
  },
  useWxavatar(e) {
    this.setData({
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    wx.showLoading({
      title: 'Uploading...',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        userPhoto: e.detail.userInfo.avatarUrl
      }
    }).then(() => {
      wx.hideLoading()
    })
    app.userInfo.userPhoto = this.data.avatarUrl
  },
  chooseImage() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const picPath = res.tempFilePaths[0]
        that.setData({
          avatarUrl: picPath
        })
      }
    })
  },
  uploadPic() {
    let that = this
    let cloudPath = "userPhoto/" + app.userInfo._openid + '.jpg';
    wx.showLoading({
      title: 'Uploading...',
    })
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: that.data.avatarUrl, // 文件路径
    }).then(res => {
      let fileId = res.fileID
      if(fileId) {
        db.collection('users').doc(app.userInfo._id).update({
          data: {
            userPhoto: fileId
          }
        }).then(() => {
          wx.hideLoading()
          wx.showToast({
            title: 'uploaded and updated',
          })
        })
        app.userInfo.userPhoto = fileId
      }
    }).catch(error => {
      wx.hideLoading()
      console.log(error)
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