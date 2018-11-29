// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

const  classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    likeCount:0,//点赞数量
    lineStatus:false,//点赞状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      //this.setData才可以更新数据
      this.setData({
        classic:res.data,
        likeCount:res.data.fav_nums,
        lineStatus:res.data.like_status
      })
    })  
  },
  //点赞
  onLike: function (event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,
      this.data.classic.type,(res)=>{
        console.log(res)
      })
  },
  //上一期周刊
  onNext: function(event){
    this._updataClassic('next')
    
  },

  //下一期的周刊
  onPrevious:function(event){
    this._updataClassic('previous')
  },

  //周刊的方法
  _updataClassic:function(nextOrPrevious){
    let index = this.data.classic.index
    classicModel.getClassic(index,nextOrPrevious,(res)=>{
      // this._getLikeStatus(res.data.id, res.data.type)
      this.setData({
        classic:res.data,
        latest:classicModel.isLatest(res.data.index),
        first:classicModel.isFirst(res.data.index)
      })
    })
  },

  //查看周刊最新
  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        this.setData({
          likeCount: res.data.fav_nums,
          likeStatus: res.data.like_status
        })
      })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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