// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

//背景播放音频
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src: String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,//播放控制
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  /** 
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attaced:function(){
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //音频播放
    onPlay:function(event){
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    //判断是否是当前播放的歌曲，在切面切换的播放按钮状态问题
    _recoverStatus:function(){
      if (mMgr.paused) {
        this.setData({
          playing:false
        })
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing:true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
