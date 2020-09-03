// pages/near/near.js
const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    latitude: '23.10229',
    longitude: '113.3245211',
    markers: []
  },
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          longitude,
          latitude
        })
        this.getNearUsers();
      }
    })
  },
  getNearUsers () {
    const _ = db.command
    db.collection('users').where({
      location: _.geoNear({
        geometry: db.Geo.Point(this.data.longitude, this.data.latitude),
        minDistance: 0,
        maxDistance: 5000,
      }),
      showLocation: true
    }).field({
      userPhoto: true,
      longitude: true,
      latitude: true
    }).get().then(res => {
      let data = res.data
      let result = []
      if(data.length) {
        for(let i = 0; i < data.length; i ++) {
          if(data[i].userPhoto.includes('cloud://')) {
            wx.cloud.getTempFileURL({
              fileList: [ data[i].userPhoto ],
              success: res => {
                result.push(
                  {
                    iconPath: res.fileList[0].tempFileURL,
                    id:  data[i]._id,
                    latitude:  data[i].latitude,
                    longitude: data[i].longitude,
                    width: 30,
                    height: 30
                  }
                )
                this.setData({
                  markers: result
                })
              },
              fail: console.error
            })
          }else{
            result.push(
              {
                iconPath: data[i].userPhoto,
                id:  data[i]._id,
                latitude:  data[i].latitude,
                longitude: data[i].longitude,
                width: 30,
                height: 30
              }
            )
          }
        }
      };
      this.setData({
        markers: result
      })
    })
  },
  markertap (ev) {
    wx.navigateTo({
      url: '/pages/detail/detail?userId=' + ev.markerId
    })
  },
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