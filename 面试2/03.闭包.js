/* 
    闭包的两个应用场景
    1.函数作为返回值
    2.函数作为参数来传递
 */

// 函数作为返回值
/* function F1() {
    var a = 100;
    return function () {
        console.log(a)
    }
}

var F2 = F1();
var a = 200;
F2(); */

//函数作为参数传递
function F1() {
    var a = 10;
    return function () {
        console.log(a);
    }
}

var f1 = F1();

function F2(fn) {
    var a = 200;
    fn();
}

F2(f1);



