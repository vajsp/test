

var total = 6;
var cur = 3;
var pageNum = 7;


var rang = Math.floor(pageNum/2);

// console.log(rang)
var pageArry = [];

var start = cur - rang;
if (start<0) start = 1;
if (start + pageNum > total) start = total - pageNum + 1;

if (pageNum > total) {
    start = 1;
    for (let index = 0; index < total; index++) {
        pageArry.push(start + index);
    }
}else{
    for (let index = 0; index < pageNum; index++) {
        pageArry.push(start + index);
    }
}


console.log(pageArry);

