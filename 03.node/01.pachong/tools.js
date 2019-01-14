// arr stringify

function arrStringify(array) {
    if (!array) {
        throw new Error('数组必须输入')
    }
    var temp = [];
    array.forEach(element => {
        var ele = JSON.stringify(element);
        temp.push(ele);
    });
    return temp
}

function arrParse(array) {
    if (!array) {
        throw new Error('数组必须输入')
    }
    var temp = [];
    array.forEach(element => {
        var ele = JSON.parse(element);
        temp.push(ele);
    });
    return temp
}

var uniq = function (array) { 
    if (!array) {
        throw new Error('数组必须输入')
    }

    var arr = arrStringify(array);

    var newArr = [...new Set(arr)];

    var finalArr = arrParse(newArr);

    return finalArr;
}



let formatDate = function (date) { 
    var arr = date.split('-');
    var newArr =  arr.map((ele) => {
        if(Number(ele)  < 10){
            return '0' + ele;
        }else{
            return ele
        }
    })
    
    var newL = newArr.join('-');
    
    return newL
}



module.exports = {
    uniq,
    formatDate
}

