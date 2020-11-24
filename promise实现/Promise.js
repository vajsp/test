// 第一版
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
        let x = onFulfilled(self.value);
    }

    if (self.status === REJECTED) {
        let x = onRejected(self.value);
    }

    if (self.status === PENDING) {
        // let x = onRejected(self.value);
        self.onResolvedCallbacks.push(function () {
            let x = onFulfilled(self.value);
        });
        self.onResolvedCallbacks.push(function () {
            let x = onRejected(self.value);
        });
    }
};

module.exports = Promise;
