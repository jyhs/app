Page({
  data: {
    share: null,
    src: null
  },
  onShareAppMessage: function (res) {
    return {
      title: this.share ? this.share.title : '礁岩海水',
      path: this.share ? this.share.path : 'https://group.huanjiaohu.com',
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
    if (shareList.length > 0) {
      this.share = shareList[shareList.length - 1];
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
    if (option.type=='group'){
      const url = `https://group.huanjiaohu.com/?#/buy/${this.compile(option.id + '')}/page`;
      this.setData({
        src: url
      })
    }else{
      this.setData({
        src: 'https://group.huanjiaohu.com'
      })
    }
 
  }
})
