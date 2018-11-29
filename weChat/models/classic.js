import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
    //流行页面的数据
    getLatest(sCallback){
        this.request({
            url:'classic/latest',
            success:(res)=>{
                sCallback(res)
                this._setLatestIndex(res.data.index)
            }
        })
    }

    //上期或下期周刊
    getClassic(index,nextOrPrevious,sCallback){
        //缓存中寻找 or API 写入到缓存
        //key 确定key
       /** 
        * 确定key的值
        * next下一个index + 1
        * previous 上一个是 index - 1
        * 
        */
        
        let key = nextOrPrevious == 'next' ?
            this._getKey(index+1) : this._getKey(index-1)
        //从缓存获取数据
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url:`classic/${index}/${nextOrPrevious}`,
                success:(res)=>{
                    wx.setStorageSync(this._getKey(res.data.index),res)
                    sCallback(res)
                }
            })
        }else {
            sCallback(classic)
        }
    	
    }
    

    //判断是否是第一期
    isFirst(index){
    	return index == 1 ? true : false
    }

    //判断是否是最后一期
    isLatest(index){ 
    	let latestIndex =  this._getLatestIndex()
    	return latestIndex == index ? true : false
    }

    //设置数据存储在本地缓存中(同步方式),存储期刊
    _setLatestIndex(index){
    	wx.setStorageSync('latest',index)
    }

    //同步获取当前storage的相关信息
    _getLatestIndex(){
    	let index = wx.getStorageSync('latest')
    	return index
    }

    //获取缓存的key
    _getKey(index){
        let key = '_classic_' + index
        return key
    }
}

export {ClassicModel}