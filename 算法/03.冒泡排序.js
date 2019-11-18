var arr = [2, 1, 31];
// var arr = [2, 1, 31, 43, 1, 4321, 321, 8, 1, 11, 22, 3, 41, 2, 13, 254, 122];


console.log(bubbleSort(arr,function (a,b) {
    return b - a;
}));

function bubbleSort(arr, callback) {
    let newArr = [].concat(arr);
    //如果没有传回调函数，那么就默认从小到大排序。
    callback = callback || function (a, b) {
        return a - b;
    }
    let a, b, status
    for (let j = 0; j < newArr.length - 1; j++) {
        status = true;
        for (let i = 0; i < newArr.length - 1 - j; i++) {
            a = newArr[i];
            b = newArr[i + 1];
            if (callback(a,b) > 0) {
                status = false;
                newArr[i] = b;
                newArr[ i + 1] = a;
            }
        }
        if (status) {
            return newArr;
        }
    }
    return newArr
}