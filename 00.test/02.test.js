var obj = '1234567843234';

// var reg = /\d{1,3}(?=(\d{3}+$))/g;
var reg = /\d{1,2}(?=(\d{2})+$)/g;

var obj1 = obj.match(reg);

console.log(obj1);

var asdf = obj.replace(reg, '$&,');

console.log(asdf);
