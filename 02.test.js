function curry(fn) {
    var length = 0;
    var enter = [];
    var define = fn.length;

    return function nihao() {

        length += arguments.length;

        var arr = Array.from(arguments);
        enter = enter.concat(arr);

        if (length >= define) {
            return fn.apply(null, enter);
        } else {
            return nihao
        }
    }
}

var abc = function (a, b, c) {
    return [a, b, c];
}

var add = function (x, y) {
    return x + y
}

var curried = curry(abc);
console.log(curried(1)(2)(3));

var curried1 = curry(add);
console.log(curried1(4)(5));