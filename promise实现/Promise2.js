// 第二版 链式调用
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
    // 缓存当前promise实例
    let self = this;
    self.value = null;
    self.status = PENDING;
    // 定义存放成功的回调数组
    self.onResolvedCallbacks = [];
    // 定义存放失败的回调的数组
    self.onRejectedCallbacks = [];

    // 当调用次方法的时候，如果promise状态为pending的话可以转换成功态
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }

        if (self.status === PENDING) {
            self.status = FULFILLED;
            // 成功后会得到一个值，这个值不能改
            self.value = value;
            // 调用所有成功回调
            self.onResolvedCallbacks.forEach((cb) => cb(self.value));
        }
    }

    function reject(reason) {
        // 如果是初始状态，则转成失败态
        if (self.status) {
            if (self.status === PENDING) {
                self.status = REJECTED;
                self.value = reason;
                self.onRejectedCallbacks.forEach((cb) => cb(self.value));
            }
        }
    }

    try {
        // 因为此函数执行可能会异常，所以需要补获，如果出错了，需要用错误
        excutor(resolve, reject);
    } catch (error) {
        // 如果这个函数执行失败了，则用失败的原因
        reject(error);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    let called = false; //promise2是否已经resolve 或reject了

    if (x instanceof Promise) {
        if (x.status === PENDING) {
            x.then(function (y) {
                resolvePromise(promise2, y, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (
        x != null &&
        (typeof x === 'object' || typeof x === 'function')
    ) {
        // x是一个thenable对象或函数，只要有then方法的对象
        // 当我们的promise和别的promise进行交互，编写这段代码尽量考虑兼容性，允许别人瞎写
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // 有些promise会同时执行成功和失败的回调
                then.call(
                    x,
                    function (y) {
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    function (err) {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(err);
                    }
                );
            } else {
                // 到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
                if (called) {
                    return;
                }
                called = true;
                resolve(x);
            }
        } catch (error) {
            if (called) {
                return;
            }
            called = true;
            reject(e);
        }
        let then = x.then;
    } else {
        // 如果x是一个普通的值，则用x的值resolve promise2
        resolve(x);
    }
}

// onFulfilled是用来接收promise成功的值或失败的原因
Promise.prototype.then = function (onFulfilled, onRejected) {
    // 如果成功和失败的回调都没有传，则表示这个then没有任何逻辑，只会把值往后抛
    onFulfilled =
        typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : (reason) => {
                  throw reason;
              };
    // 如果当前promise状态已经是成功状态了，onFulfilled直接取值
    let self = this;
    let promise2;

    if (self.status === FULFILLED) {
        return (promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    // 如果获取到了返回值x，会走解析promise的过程
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    // 如果执行成功的回调过程中出错了，用错误原因吧promise2 reject
                    reject(error);
                }
            });
        }));
    }

    if (self.status === REJECTED) {
        setTimeout(() => {
            try {
                let x = onRejected(self.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    if (self.status === PENDING) {
        // let x = onRejected(self.value);
        self.onResolvedCallbacks.push(function () {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
        self.onResolvedCallbacks.push(function () {
            setTimeout(() => {
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
};

// catch的原理只传失败的回调
Promise.prototype.catch = function (onReject) {
    this.then(null, onReject);
};

Promise.deferred = Promise.defer = function () {
    let defer = {};
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
};

Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        let result = [];
        let count = 0;
        function done(i, data) {
            result[i] = data;
            if (++count == promises.length) {
                resolve(result);
            }
        }
        for (let i = 0; i < array.length; i++) {
            promises[i].then(function (data) {
                done(i, data);
            }, reject);
        }
    });
};

Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < array.length; i++) {
            promises[i].then(resolve, reject);
        }
    });
};

Promise.resolve = function (value) {
    return new Promise(function (resolve) {
        resolve(value);
    });
};

Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
};

module.exports = Promise;
