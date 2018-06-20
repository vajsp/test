function randomId(len) {
    len = len || 5;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd +=  $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return new Date().getTime() + pwd + "";
}
var id = randomId()
console.log(id);

