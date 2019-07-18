// 基础版本

// 构造函数是个异步任务
function Promise(task) {
  let that = this

  // 默认状态为pending
  that.status = 'pending'
  // 此变量存放着promise 的结果
  this.value = null;

  // 存放的所有成功函数的回调
  that.onResolvedCallbacks = []
  that.onRejectedCallbacks = []

  // 调用此方法可以把当前的promise变为成功状态
  function resolve(value) {
    if (that.status = 'pending') {
      that.status = 'fullfilled'
      that.value = value
      that.onResolvedCallbacks.forEach(item=>item(value))
    }
  }

  // 调用此方法可以把当前的promise变成失败状态
  function reject(reason) {
    // 如果当前状态是初始状态，则转成失败态
    if (that.status = 'pending') {
      that.status = 'rejected'
      that.value = reason;
      that.onRejectedCallbacks.forEach(item=>item(reason))
    }
  }

  // 立即执行传入的任务
  try {
    task(resolve, reject);
  } catch (error) {
    reject(e)
  }
}

// onFullfiled 成功的回调  onReject失败的回调
Promise.prototype.then = function (onFullfilled,onReject) { 
  let that = this;
  that.onResolvedCallbacks.push(onFullfilled)
  that.onRejectedCallbacks.push(onReject)


}

module.exports = Promise