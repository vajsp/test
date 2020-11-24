// let MyPromise = require('./Promise.js');
let MyPromise = require('./Promise2.js');

let p1 = new MyPromise(function (resolve, reject) {
    let num = Math.random();
    if (num < 0.5) {
        resolve(num);
    } else {
        reject('失败');
    }
});

p1.then(
    function (data) {
        console.log(data);
    },
    function (err) {
        console.error(err);
    }
);
