function Promise1(task) {
  var that = this
  that.status = 'pending'
  that.value = null

  that.onResolvedCallbacks = []
  that.onRejectedCallbacks = []

  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'fulfilled'
      that.value = value
      that.onRejectedCallbacks.forEach(item => item(value))
    }
  }

  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'rejected'
      that.value = reason
      that.onRejectedCallbacks.forEach(item => item(reason))
    }
  }

  try {
    task(resolve, reject);
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let then

  // 如果x就是promise2
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  console.log('x');
  console.log(x);

  if (x instanceof Promise) {
    if (x.status == 'pending') {

      x.then(function (y) {
        resolvePromise(promise2, y, resolve, reject)
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
        }, function (y) {
          reject(y)
        })
      }
    } catch (error) {
      reject(error)
    }

  } else {
    resolve(x)
  }
}

Promise1.prototype.then = function (onFulfilled, onReject) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value
  }

  onReject = typeof onReject === 'function' ? onReject : function (reason) {
    throw reason
  }

  let that = this
  let promise2

  if (that.status === 'fulfilled') {
    promise2 = new Promise1(function (resolve, reject) {
      var x = onFulfilled(that.value)
      // resolve(x)
      resolvePromise(promise2, x, resolve, reject)
    })
  }

  if (that.status === 'rejected') {
    promise2 = new Promise1(function (resolve, reject) {
      var x = onReject(that.value)
      // resolve(x)
      resolvePromise(promise2, x, resolve, reject)
    })
  }

  if (that.status === 'pending') {
    promise2 = new Promise1(function (resolve, reject) {
      that.onResolvedCallbacks.push(function () {
        var x = onFulfilled(that.value)
        // resolve(x)
        resolvePromise(promise2, x, resolve, reject)
      })

      that.onRejectedCallbacks.push(function () {
        var x = onReject(that.value)
        // resolve(x)
        resolvePromise(promise2, x, resolve, reject)
      })
    })
  }

  return promise2
}

var p1 = new Promise1(function (resolve, reject) {
  resolve('100')
  // reject('200')
})

// 成功的回调后的值会被用来resolve当前的promise
// 成功的回调里又返回了一个新的promise
// 成功的回调了返回的promise还不是我自己写的Promise
// 如果成功的回调返回了一个promise,那么promise1要以promise的结果resolve结果来resolve自己
var p2 = p1.then(function (data) {
  console.log('p1', data);
  return new Promise1(function (resolve, reject) {
    setTimeout(() => {
      // 叠加promise
      console.log(data);
      resolve(data + 100)
    }, 1000);
  })
})

p2.then(function (res) {
  console.log('p2成功', res);
}, function (res) {
  console.log('p2失败', res);
})