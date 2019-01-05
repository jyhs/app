Page({
  data: {
    share: null,
    src:null
  },
  onShareAppMessage: function (res)  {
    if(this.share&&this.share.shareUserId){
      const param = {
        user_id:this.share.shareUserId,
        param:this.share.param,
        auth: this.share.auth
      }
      wx.request( {
        url: "https://api.huanjiaohu.com/share/add",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': param.auth
        },
        method: "POST",
        data: param,
        complete: function( res ) {
          if( res == null || res.data == null ) {
            console.error( '网络请求失败' );
            return;
          }
        }
      })
    }

    return {
      title: this.share ? this.share.title : '礁岩海水',
      path: this.share ? '/pages/index/index?' + this.share.param  : '/pages/index/index',
      imageUrl: this.share ? this.share.imageUrl : "https://static.huanjiaohu.com/image/share/default.png",
      success: (res) => {
        // const shareTicket = (res.shareTickets && res.shareTickets[0]) || '';
        // console.log(shareTicket)
        // wx.getShareInfo({
        //   shareTicket: shareTicket,
        //   success:  (res) => { 
            
            
        //   },
        //   fail: function (res) { console.log("fail",res) },
        //   complete: function (res) { console.log("fail222", res) }
        // })
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  bindGetMsg: function (e) {
    const shareList = e.detail['data'];
    if (shareList.length>0){
      this.share = shareList[shareList.length-1];
    }
  },
  onLoad: function (option) {
    if(option.q){
      const scanUrl = decodeURIComponent(option.q);
      if(scanUrl.indexOf('groupShop')>0){
        const id = scanUrl.match(/\d+/);
        this.setData({
          src: `https://group.huanjiaohu.com/#/groupShop/${id}`
        })
      }else{
        this.setData({
          src: 'https://group.huanjiaohu.com?uid=1'
        })
      }
    }else{
      switch (option.type) {
        case 'group':
          this.setData({
            src: `https://group.huanjiaohu.com/#/groupShop/${option.id}`
          })
          break;
        case 'dict':
          this.setData({
            src: `https://group.huanjiaohu.com/#/ency/${option.id}/detail`
          })
          break;
        case 'game':
          this.setData({
            src: `https://game.huanjiaohu.com`
          })
        break;
        case 'bill-download':
          this.setData({
            src: `https://group.huanjiaohu.com/bill/${option.id}/download`
          })
          break;
        case 'bill-detail':
          this.setData({
            src: `https://group.huanjiaohu.com/#/bill/${option.id}/detail`
          })
          break;
        default:
          this.setData({
            src: 'https://group.huanjiaohu.com?uid=1'
          })
      }
    }
  }
})
