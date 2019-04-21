// 发布订阅模式  订阅在有发布[fn1,fn2,fn3]

// 绑定的方法 都有一个update属性
function Dep() {
  this.subs = []
}

Dep.prototype.addSub = function (sub) {
  // 订阅
  this.subs.push(sub)
}

Dep.prototype.notify = function () {
  this.subs.forEach((sub) => {
    sub.update()
  })
}

function Watcher(fn) {
  this.fn = fn
}

Watcher.prototype.update = function () {
  this.fn()
}

let watcher = new Watcher(function () {
  console.log(11111111)
})

let dep = new Dep()
dep.addSub(watcher) //将watcher放到了数组中[watcher.update]
dep.addSub(watcher)
console.log(dep.subs)

dep.notify()