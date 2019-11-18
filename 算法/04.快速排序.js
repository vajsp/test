let arr = [1, 3, 2, 5];



function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var pivot = arr.splice(0, 1)[0];
    var left = [];
    var right = [];
    // 4
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot],quickSort(right));
}

console.log(quickSort(arr));
