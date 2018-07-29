Page({
  data: {
    share: null,
    src:null
  },
  onShareAppMessage: function (res)  {
    return {
      title: this.share ? this.share.title : '礁岩海水',
      path: this.share ? '/pages/index/index?' + this.share.param  : '/pages/index/index',
      imageUrl: this.share ? this.share.imageUrl : "https://static.huanjiaohu.com/image/share/default.png",
      success: (res) => {
        console.log("转发成功", res);
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
  compile: function (code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    c = escape(c.split('').join(' '));
    return c;
  },
  onLoad: function (option) {
    switch (option.type) {
      case 'group':
        this.setData({
          src: `https://group.huanjiaohu.com/?#/buy/${this.compile(option.id + '')}/page`
        })
        break;
      case 'dict':
        this.setData({
          src: `https://group.huanjiaohu.com/#/ency/${option.id}/detail`
        })
        break;
      case 'bill-download':
        this.setData({
          src: `https://static.huanjiaohu.com/bill/${option.id}/download`
        })
        break;
      case 'bill-detail':
        this.setData({
          src: `https://group.huanjiaohu.com/#/bill/${option.id}/detail`
        })
        break;
      default:
        this.setData({
          src: 'https://group.huanjiaohu.com'
        })
    }
  }
})
