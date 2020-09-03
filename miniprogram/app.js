//app.js
App({
  onLaunch: function () {
    if(!wx.cloud) {
      console.error("请使用更高版本")
    } else {
      wx.cloud.init({
        env: 'miaomiao321',
        traceUser: true // 用于检测哪些用户在进行小程序云开发的调用
      })
    }
    this.userInfo={} // 定义一个全局变量userInfo
    this.userMessage = []
  },
  onShareAppMessage: async function() {
    let imgUrl = '../miniprogram/images/erica.jpeg'
     return {
       title: '你好',
       path: `/pages/index/index`,
       imageUrl: await cutShareImg(imgUrl)
     }
   },
  globalData: {}
})