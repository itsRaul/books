// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      this.setData({
        book:res[0],
        comments: res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      })
      
      wx.hideLoading()
    })
    //书籍详情
    // detail.then(res=>{
    //   this.setData({
    //     book:res
    //   })
    // })

    // //短评
    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus:res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
  },

  //点赞
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel,this.data.book.id,400,(res) => {
      console.log(res)
    })
  },

  //展开面板
  onFakePost(event){
    this.setData({
      posting: true
    })
  },

  //面板取消
  onCancel(event){
    this.setData({
      posting: false
    })
  },

  //短评添加，放到短评数组的第一位，setData更新数据，隐藏mask框
  onPost(event){
    const comment = event.detail.text || event.detail.value
    
    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.shouToast({
        title:'短评最多12个字',
        icon:'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id,comment)
      .then(res=>{
        wx.showToast({
          title:'+1',
          icon:"none"
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments:this.data.comments,
          posting:false
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