import {HTTP} from '../util/http-p.js'

class KeywordModel extends HTTP{
    key = 'q'
    maxLength = 10
    getHistory() {
        const words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }

    getHot() {
        return this.request({
            url:'/book/hot_keyword'
        }) 
    }

    addToHistory(keyword) {
       
        let words = this.getHistory()
        //判断一个数组是否包含一个指定的值,包含则返回 true，否则返回false。
        const has = words.includes(keyword)
        //队列
        if (!has) {
            // 数组末尾 删除 ， keyword 数组第一位
            const length = words.length
            if(length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }
}

export {KeywordModel}