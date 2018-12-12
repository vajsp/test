var obj = {
    set x(value){
        return value
    },
    get x(){
        return x
    }
}

obj['x'] = 2;
console.log(obj['x']);