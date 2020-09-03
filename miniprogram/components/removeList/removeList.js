// components/removeList/removeList.js
let app = getApp()
let db = wx.cloud.database()
Component({
  properties: {
    messageId: String
  },
  data: {
    userPhoto: '',
    nickName: ''
  },
  methods: {
    toDetailPage() {
      wx.navigateTo({
        url: '../../pages/detail/detail?userId=' + this.data.messageId,
      })
    },
    handleDelete(e) {
      wx.showModal({
        title: '删除对话框',
        content: '确认删除好友请求？',
        confirmText: '删除',
        success: (res) => {
          if (res.confirm) {
            this.deleteMessage();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleAdd() {
      const _ = db.command
      wx.showModal({
        title: '提示信息',
        content: '确认通过好友申请？',
        confirmText: '确认',
        success: (res) => {
          if (res.confirm) {
            // 要把当前账号的friendlist中加入点击的id的用户
      db.collection('users').doc(app.userInfo._id).update({
        data: {
          friendList:  _.unshift(this.data.messageId)
        }
      }).then(res => {
        this.deleteMessage()
              // 添加进当前账号的同时要把当前账号添加到点击id用户的friendlist中，用到云函数
              wx.cloud.callFunction({
                name: 'update',
                data: {
                  collection: 'users',
                  doc: this.data.messageId,
                  data: `{friendList: _.unshift('${app.userInfo._id}')}`
                }
              }).then(res => {
                console.log(res)
              }).catch(err => {
                // handle error
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    deleteMessage() {
      db.collection('message').where({
        userId: app.userInfo._id
      }).get().then(res => {
        let list = res.data[0].list
        list = list.filter((item, index) => {
          return item != this.data.messageId
        })
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collection: 'message',
            where: {
              userId: app.userInfo._id
            },
            data: {
              list
            }
          }
        }).then(res => {
          this.triggerEvent('removeevent', list)
        }).catch(err => {
          // handle error
        })
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 根据申请人的id获取到申请人的信息
      db.collection('users').doc(this.data.messageId).field({
        userPhoto: true,
        nickName: true
      }).get().then(res => {
        this.setData({
          userPhoto: res.data.userPhoto,
          nickName: res.data.nickName
        })
      })
    }
  }
})
