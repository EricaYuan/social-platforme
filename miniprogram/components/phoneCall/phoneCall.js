// components/phoneCall/phoneCall.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    phoneNumber: String
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    makePhonecall() {
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber
      })
    }
  }
})
