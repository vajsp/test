(function (name, definition) {
    // 检测上下文环境是否AMD或者CMD
    var hasDefine = typeof define === 'function';
    // 检测上下文环境是否为node
    hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        //AMD环境或CMD环境
        define(definition);
    }else if(hasExports){
        //定义为普通的node模块
        module.exports = definition();
    }else{
        //将模块的执行结果挂在window变量中，在浏览器中this指向window对象
        this[name] = definition();
    }

})('hellow', function () {
    var hellow = function () { }
    return hellow
})
