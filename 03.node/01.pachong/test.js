var reg = /\/|\\/g;

var str = "【在线】高颜值混血主播@莫儿baby 直播秀无修正版[1V/644M] ";

var arr = str.match(reg);

var str = str.replace(reg,'你好');

console.log(str);

