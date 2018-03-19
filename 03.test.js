let arr = [1, 23123132, 2, 22, 1, 3, 3];



function bubble(arr) {
    var array = [].concat(arr);
    var a, b, status

    for (let j = 0; j < array.length - 1; j++) {
        status = true
        for (let i = 0; i < array.length - 1 - j; i++) {
            a = array[i]
            b = array[i + 1]
            if (a > b) {
                status = false;
                array[i] = b;
                array[i + 1] = a;
            }
        }
        if (status) {
            return array
        }
    }

    return array
}

console.log(bubble(arr))