var arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];


function fn(arr) {
  if (!(arr instanceof Array)) return;

  var newArr = [];

  function pushArr(arr) {
    arr.forEach((ele) => {
      if (ele instanceof Array) {
        pushArr(ele)
      } else {
        newArr.push(ele)
      }
    })
  }

  pushArr(arr)

  var newArr2 = [...new Set(newArr)];

  newArr2 = newArr2.sort((a,b) => {
    return a - b
  })

  console.log(newArr2);
  return newArr2
}

fn(arr)