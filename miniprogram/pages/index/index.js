// pages/index/index.js
const db = wx.cloud.database();

Page({
  data: {
    background: [
      '../../images/swipe1.jpeg',
      '../../images/swipe2.jpeg'
    ],
    userList: [],
    current: 'time'
  },
  onLoad: function (options) {

  },
  onReady: function () {
    this.getSortedList();
  },
  addonLinks (e) {
    let theId = e.currentTarget.dataset.id
    // 调用云函数update
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'users',
        doc: theId,
        data: "{links: _.inc(1)}"
      }
    }).then((res) => {
      let isUpdated = res.result.stats.updated
      if(isUpdated) { // 如果更新成功，要更新本地的userList，渲染到页面
        let clonedList = [...this.data.userList]
        clonedList.forEach((item) => {
          if(item._id == theId) {
            item.links ++ // 给本地list中的links加一
          }
        })
        this.setData({
          userList: clonedList
        })
      }
    })
  },
  handleTab(e) {
    let current = e.currentTarget.dataset.current
    this.setData({
      current
    }, () => {
      this.getSortedList()
    })
  },
  getSortedList () {
    // 从db中度去出用户信息（nickname, count, avatarurl)
    db.collection('users').field({
      nickName: true,
      links: true,
      userPhoto: true
    })
    .orderBy(this.data.current, 'desc')
    .get().then((res) => {
      this.setData({
        userList: res.data
      })
    })
  },
  goToDetail (e) {
    let toId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/detail/detail?userId=' + toId,
    })
  },
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