// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  //插槽
  options: {
    multipleSlots: true
  },
  properties: {
    openType:{
      type:String
    }
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
    //自定义事件
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo',event.detail, {})
    }
  }
})
