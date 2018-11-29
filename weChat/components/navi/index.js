// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听自定义事件,如果不是最后一期才监听执行
    onLeft:function(event){
      if (!this.properties.latest) {
        this.triggerEvent('left',{},{})
      }      
    },

    //监听自定义事件,如果不是最新一期才监听执行
    onRight:function(event){
      if (!this.properties.first) {
        this.triggerEvent('right',{},{})
      } 
    },
  }
})
