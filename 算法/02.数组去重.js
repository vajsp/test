let arr = [1,2,3,3];



//方法1
console.log(quchong(arr))
function quchong(arr) {
    var newArr = [].concat(arr);
    for (let i = 0; i < newArr.length-1; i++) {
        for (let j = i+1; j < newArr.length; j++) {
            if (newArr[i] === newArr[j]) {
                newArr.splice(j,1);
                j--;
            }
        }
    }
    return newArr
}

// 方法2
console.log([...new Set(arr)]);

//方法3

function quchong3(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr
}

console.log(quchong3(arr))