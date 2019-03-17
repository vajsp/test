// 一、原型对象
const prototype = {
    getName: function () { 
        return this.first + " " + this.last
    },
    say: function () { 
        console.log('hellow');
    }
}

// 基于原型创建 x
let x = Object.create(prototype);
console.log('x');
console.log(x);
x.first = 'A';
x.last = 'B';
console.log(x.getName());
x.say();

//基于原型创建 y
// let y = Object.create(prototype);
// y.first = 'C';
// y.last = 'D';
// console.log(y.getName());
// y.say();