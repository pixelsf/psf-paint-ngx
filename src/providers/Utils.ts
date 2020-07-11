export class Utils {
  static dataURLtoBlob(dataURL : string) : Blob {
    let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  static fileToObjectUrl(file: Blob): string {
    return window.URL.createObjectURL(file)
  }

  static revokeObjectUrl(objectUrl: string) {
    window.URL.revokeObjectURL(objectUrl);
  }

  /**
    * 对Date的扩展，将 Date 转化为指定格式的String
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(u)可以用 1-3 个占位符(是 1-3 位的数字)
      例子：
      (new Date()).Format("yyyy-MM-dd hh:mm:ss.uuu") ==> 2017-07-01 01:01:01.423
      (new Date()).Format("yyyy-M-d h:m:s.u")      ==> 2017-7-1 1:1:1.423
    * @param {Date} 时间
    * @param {string} 日期格式
  */
  static formatDate(date: Date,fmt: string): string { //author: meizz
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "u+": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        if (k == "u+") {
          let t;
          if (RegExp.$1.length == 3) {
            t = ("000" + o[k]).substr(("" + o[k]).length);
          } else if (RegExp.$1.length == 2 && ("" + o[k]).length < 2 ){
            t = ("00" + o[k]).substr(("" + o[k]).length);
          } else {
            t = o[k];
          }
          fmt = fmt.replace(RegExp.$1, t );
        } else {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
    }
    return fmt;
  }

  static arrayShuffle(array: any[]) {
    let len = array.length;
    for(let i = 0; i < len - 1; i++){
      let index = Math.floor(Math.random() * (len - i));
      let temp = array[index];
      array[index] = array[len - i - 1];
      array[len - i -1] = temp;
    }
    return array;
  }

  static getRandomFileNameWithoutExtension(): string {
    let randomNum = Math.floor(Math.random() * 10000);
    let randomString = ("0000" + randomNum).substr(("" + randomNum).length);
    return Utils.formatDate(new Date(),"yyyyMMddhhmmssuuu") + "_" + randomString;
  }
}
