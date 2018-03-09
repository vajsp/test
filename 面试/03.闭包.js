/* 
    闭包的两个应用场景
    1.函数作为返回值
    2.函数作为参数来传递
 */

//1.函数作为返回值
/* function F1() {
    var a = 100;
    return function () {
        console.log(a)
    }
}

var F2 = F1();
var a = 200;
F2(); */

//2.函数作为参数传递
/* function F1() {
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

F2(f1); */

// 3.单例模式
var Person = (function () {
    var instance
    function init(name) {
        return {
            name:name
        }
    }

    return {
        createPerson: function (name) {
        if (!instance) {
            instance = init(name);
        }

        return instance
    }}
})();

var xiaoming = Person.createPerson('xiaoming');
var limei = Person.createPerson('limei');

console.log(xiaoming === limei)

/* var People = (function () {
    var instance;
    function init(name) {
        //define private methods and properties
        //do something
        return {
            //define public methods and properties
        };
    }
    return {
        createPeople: function (name) {
            if (!instance) {
                instance = init(name);
            }
            return instance;
        }
    };
}());
var obj1 = People.createPeople('123');
var obj2 = People.createPeople('456');

console.log(obj1 === obj2) */