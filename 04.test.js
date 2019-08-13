function Promise1(task) {
  var that = this
  that.value = null
  that.status = 'pending'
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'fulfilled'
      that.value = value
      that.resolvedCallbacks.forEach(item => item(value))
    }
  }

  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'rejected'
      that.value = reason
      that.rejectedCallbacks.forEach(item => item(reason))
    }
  }

  try {
    task(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let then
  // 如果x就是promise2
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function (y) {
        resolvePromise(promise2, y, resolve, reject);
      }, reject)
    } else if (x.status === 'fulfilled') {
      resolve(x.value)
    } else if (x.status === 'rejected') {
      reject(x.value)
    }
  } else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(x, function (y) {
          resolvePromise(promise2, y, resolve, reject)
        }, reject)
      }
    } catch (error) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise1.prototype.then = function (onFulfilled, onRject) {
  var that = this
  var promise2

  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value
  }
  onRject = typeof onRject === 'function' ? onRject : function (reason) {
    throw reason
  }

  if (that.status === 'fulfilled') {
    promise2 = new Promise(function (resolve, reject) {
      var x = onFulfilled(that.value)
      // resolve(x)
      resolvePromise(promise2, x, resolve, reject)
    })
  }

  if (that.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      var x = onRject(that.value)
      resolvePromise(promise2, x, resolve, reject)
    })
  }

  if (that.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      that.resolvedCallbacks.push(function () {
        var x = onFulfilled(that.value);
        resolvePromise(promise2, x, resolve, reject)
      })

      that.rejectedCallbacks.push(function (resolve, reject) {
        var x = onRject(that.value)
        resolvePromise(promise2, x, resolve, reject)
      })
    })
  }

  return promise2
}

let p1 = new Promise1(function(resolve,reject){
  setTimeout(function(){
    resolve(100);
  },1000);
});
//成功回调后的值会被用来resolve当前的promise
//成功的回调里又返回了一个新的promise
//成功的回调里返回的promise还不是我自己写Promise
//如果成功的回调里返回了一个promise,那么promise2要以promise的resovle结果来resolve自己
let p2 = p1.then(function(data){
  console.log(data);
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(data+100);
        },1000);
      }));
    },1000);
  });
});
p2.then(function(data){
  console.log('p2成功',data);
},function(err){
  console.log('p2失败',err);
});

// var p1 = new Promise1(function (resolve, reject) {
//   // var num = Math.random()
//   // if (num > 0.5) {
//   //   resolve('成功')
//   // } else {
//   //   reject('失败')
//   // }
//   setTimeout(() => {
//     // reject(100)
//     resolve(100)
//   }, 1000);
// })

// var p2 = p1.then(function (data) {
//   console.log(data);
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       // resolve(new Promise(function () {
//       //   setTimeout(() => {
//       //     resolve(data + 100)
//       //   }, 1000);
//       // }))
//       resolve(data + 100)
//     }, 1000);
//   })
// })

// p2.then(function (data) {
//   console.log('p2成功', data);
// }, function (err) {
//   console.log('p2失败', err);
// })